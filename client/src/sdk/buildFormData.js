const isObject = o => typeof o === 'object' && !!o;

const buildFormDataRecursive = (
	object,
	parentKey,
	filesData = new FormData(),
	otherData = {}
) => {
	for (const key in object) {
		const propName = parentKey ? parentKey + '[' + key + ']' : key;

		if (object[key] instanceof File) {
			filesData.append(propName, object[key]);
		} else if (object[key] instanceof FileList) {
			for (let j = 0; j < object[key].length; j++) {
				filesData.append(propName + '[' + j + ']', object[key].item(j));
			}
		} else if (isObject(object[key])) {
			otherData[key] = Array.isArray(object[key]) ? [] : {};

			buildFormDataRecursive(object[key], propName, filesData, otherData[key]);
		} else {
			otherData[key] = object[key];
		}
	}

	return [filesData, otherData];
};

const buildFormData = body => {
	const [filesData, otherData] = buildFormDataRecursive(body);

	filesData.append('json', JSON.stringify(otherData));

	return filesData;
};

export default buildFormData;
