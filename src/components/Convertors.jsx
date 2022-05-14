export function timeConverter(d) {
    let time = new Date(d * 1000);
    let hour = time.getHours();
    let min = time.getMinutes();
    let convertedTime = hour + ':' + min;

    return convertedTime
}

export function kToC(t) {
    let convertedTemp = t - 273.15;
    return convertedTemp.toString().substring(0, 4) + '°C';
}

export function update() {
    let currentdate = new Date();
    let datetime = currentdate.getHours() + ":" + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    return datetime
}


