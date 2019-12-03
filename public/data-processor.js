const separator = ' / ';

let regions = [];
let provinces = [];
let districts = [];

function intiDataProcessor(data) {
    ReadText(data);

    regions = getListWithoutDuplicates(regions);
    provinces = getListWithoutDuplicates(provinces);
    districts = getListWithoutDuplicates(districts);
}

function ReadText(data) {
    for (let item of data) {
        let regionGroup = item.substring(1, item.indexOf(separator));
        let region = getCodeNameObject(regionGroup);

        regions.push(region);

        let firstGroup = item.substring(1, item.lastIndexOf(separator));
        let province = getObject(firstGroup);

        if (province.code !== '') {
            provinces.push(province);
        }

        let secondGroup = item
            .substring(item.indexOf(separator) + separator.length, item.length - 1)
            .replace('”', '');
        let district = getObject(secondGroup);

        if (district.code !== '') {
            districts.push(district);
        }
    }
}

function getObject(str) {
    var fatherCrude = str.substring(0, str.indexOf(separator));
    var sonCrude = str.substring(str.indexOf(separator) + separator.length);

    var father = getCodeNameObject(fatherCrude);
    var son = getCodeNameObject(sonCrude);

    return {
        code: son.code,
        name: son.name,
        codeFather: father.code,
        descriptionFather: father.name
    };
}

function getCodeNameObject(str) {
    let code = str.substring(0, str.indexOf(' '));
    let name = str.substring(str.indexOf(' ') + 1);

    return {
        code: code,
        name: name
    };
}

function getListWithoutDuplicates(arr) {
    return [...new Map(arr.map(i => [i.code, i])).values()]
};