import { Restaurant, Currency } from "../db/index.mjs";

class restaurantService {
  static async getRestaurants() {
    const restaurants = await Restaurant.findAll();
    return restaurants;
  }

  static async getRestaurantsPaging({ page, pageSize }) {
    const restaurants = await Restaurant.findAllPaging({ page, pageSize });
    return restaurants;
  }

  static async getRestaurantInfo({ id }) {
    const restaurant = await Restaurant.findById({ id });

    // db에서 해당 식당을 찾지 못한 경우, 에러 메시지 반환
    if (!restaurant) {
      const errorMessage = "해당 레스토랑은 존재하지 않습니다.";
      return { errorMessage };
    }

    return restaurant;
  }

  static async getRestaurantsByCountry({ country }) {
    const restaurants = await Restaurant.findAllByCountry({ country });

    // db에서 해당 국가에 존재하는 식당을 찾지 못한 경우, 에러 메시지 반환
    if (!restaurants) {
      const errorMessage = "해당 국가에 식당이 존재하지 않습니다.";
      return { errorMessage };
    }

    return restaurants;
  }

  static async getRestaurantsByCountryPaging({ page, pageSize, country }) {
    const restaurants = await Restaurant.findAllByCountryPaging({
      page,
      pageSize,
      country,
    });

    // db에서 해당 국가에 존재하는 식당을 찾지 못한 경우, 에러 메시지 반환
    if (!restaurants) {
      const errorMessage = "해당 국가에 식당이 존재하지 않습니다.";
      return { errorMessage };
    }

    return restaurants;
  }

  static async getConvertedPrice({ id, currencyCode }) {
    const restaurant = await Restaurant.findById({ id });

    // db에서 해당 식당을 찾지 못한 경우, 에러 메시지 반환
    if (!restaurant) {
      const errorMessage = "해당 레스토랑은 존재하지 않습니다.";
      return { errorMessage };
    }

    // 현재 식당의 최고가, 최저가, 통화를 확인
    const { minPrice, maxPrice, currency: currentCurrencyCode } = restaurant;
    // 가격 정보를 제공하지 않는 식당의 경우, 에러 메시지 반환
    if (!minPrice) {
      const errorMessage = "해당 레스토랑은 가격 정보를 제공하지 않습니다.";
      return { errorMessage };
    }

    const targetCurrency = await Currency.findByCode({ code: currencyCode });
    const currentCurrency = await Currency.findByCode({
      code: currentCurrencyCode,
    });

    // db에서 해당 통화를 찾지 못한 경우, 에러 메시지 반환
    if (!targetCurrency) {
      console.log(targetCurrency, currencyCode);
      const errorMessage = "해당 통화에 대한 정보가 존재하지 않습니다.";
      return { errorMessage };
    }

    // 현재 통화와 타켓 통화가 일치할 경우 기존 값을 반환
    if (currentCurrency.code === targetCurrency.code) {
      return { minPrice, maxPrice };
    }

    let convertedMinPrice, convertedMaxPrice;

    // exchange_rates가 EUR를 기준으로 value값이 설정 되어 있으므로 타겟 통화의 value로 계산
    if (currentCurrency.code === "EUR") {
      convertedMinPrice = minPrice * targetCurrency.value;
      convertedMaxPrice = maxPrice * targetCurrency.value;
    } else {
      // EUR를 기준으로 비율 계산 (타겟 통화 value / 현재 통화 value)
      const ratio = targetCurrency.value / currentCurrency.value;
      convertedMinPrice = minPrice * ratio;
      convertedMaxPrice = maxPrice * ratio;
    }

    return { minPrice: convertedMinPrice, maxPrice: convertedMaxPrice };
  }

  static async countRestaurantByCountry(country) {
    const ret = await Restaurant.countByCountry(country);
    return ret;
  }
}

export { restaurantService };
