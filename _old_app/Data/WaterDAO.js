const SensorCheckup = require("../classes/SensorCheckup")

class WaterDAO {

    water_analysis() {
        let sensor_checkup = new SensorCheckup()

        let sensorcheckup = sensor_checkup.get_complete_analysis();

        return sensorcheckup
    }
}


module.exports = WaterDAO