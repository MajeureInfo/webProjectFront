# Web Interface

Website available at the following url: https://majeureinfo.github.io/webProjectFront/

### Description
This is a web interface for the management of a set of rooms and buildings.

### Features
* The data comes from a REST API provided by a [server](https://github.com/MajeureInfo/webProject) hosted on [Heroku](https://www.heroku.com/).
* User requests made from this interface update the database on the Heroku server and also send MQTT messages to a [CloudMQTT](https://www.cloudmqtt.com/) broker.
This enables real-time updates of other user interfaces thanks to the asynchrony of MQTT. These messages could also be received by the objects themselves, however this is not implemented yet.
* This interface is itself updated in real-time whis MQTT messages sent by other interfaces such as the [Android application](https://github.com/MajeureInfo/AndroidApp) or the [Arduino object](https://github.com/MajeureInfo/Arduino).
