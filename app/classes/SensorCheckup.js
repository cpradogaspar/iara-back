const CONSTANTS = require("../../_old_app/constants/VMP");

class SensorCheckup {
  get_random(element) {
    switch (element) {
      case "ph":
        return Math.random() * (14 - 0) + 0;
      case "nivel_agua":
        return Math.random() * (20 - 0) + 0;
      case "temperatura":
        return Math.random() * (40 - -10) + -10;
      case "turbidez":
        return Math.random() * (7 - 0) + 0;
      case "condutividade":
        return Math.random() * (250 - 10) + 10;
    }
  }

  get_complete_analysis() {
    let sensor_checkup = {
      ph: this.check({ prop: "ph", value: this.get_random("ph") }),
      nivel_agua: this.check({
        prop: "nivel_agua",
        value: this.get_random("nivel_agua")
      }),
      temperatura: this.check({
        prop: "temperatura",
        value: this.get_random("temperatura")
      }),
      turbidez: this.check({
        prop: "turbidez",
        value: this.get_random("turbidez")
      }),
      condutividade: this.check({
        prop: "condutividade",
        value: this.get_random("condutividade")
      })
    };

    return sensor_checkup;
  }

  check(prop_and_value) {
    switch (prop_and_value.prop) {
      case "ph":
        return {
          prop: "Potencial Hidrogeniônico",
          status: prop_and_value.value,
          VMaxP: CONSTANTS.pH_MAX,
          VMinP: CONSTANTS.pH_MIN,
          result:
            prop_and_value.value <= CONSTANTS.pH_MAX &&
            prop_and_value.value >= CONSTANTS.pH_MIN
              ? true
              : false
        };
      case "nivel_agua":
        return {
          prop: "Nível da água",
          status: prop_and_value.value,
          VMaxP: CONSTANTS.NIVEL_AGUA_MAX,
          VMinP: CONSTANTS.NIVEL_AGUA_MIN,
          result:
            prop_and_value.value <= CONSTANTS.NIVEL_AGUA_MAX &&
            prop_and_value.value >= CONSTANTS.NIVEL_AGUA_MIN
              ? true
              : false
        };
      case "temperatura":
        return {
          prop: "Temperatura",
          status: prop_and_value.value,
          VMaxP: CONSTANTS.TEMPERATURA_MAX,
          VMinP: CONSTANTS.TEMPERATURA_MIN,
          result:
            prop_and_value.value <= CONSTANTS.TEMPERATURA_MAX &&
            prop_and_value.value >= CONSTANTS.TEMPERATURA_MIN
              ? true
              : false
        };
      case "turbidez":
        return {
          prop: "Turbidez",
          status: prop_and_value.value,
          VMaxP: CONSTANTS.TURBIDEZ_MAX,
          VMinP: CONSTANTS.TURBIDEZ_MIN,
          result:
            prop_and_value.value <= CONSTANTS.TURBIDEZ_MAX &&
            prop_and_value.value >= CONSTANTS.TURBIDEZ_MIN
              ? true
              : false
        };
      case "condutividade":
        return {
          prop: "Condutividade",
          status: prop_and_value.value,
          VMaxP: CONSTANTS.CONDUTIVIDADE_MAX,
          VMinP: CONSTANTS.CONDUTIVIDADE_MIN,
          result:
            prop_and_value.value <= CONSTANTS.CONDUTIVIDADE_MAX &&
            prop_and_value.value >= CONSTANTS.CONDUTIVIDADE_MIN
              ? true
              : false
        };
    }
  }
}

module.exports = SensorCheckup;
