export const getCookie = (name) => {

    return document.cookie.split('; ').reduce((accumulator, currentValue) => {
        const parts = currentValue.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : accumulator
    }, null)
}

// only float numbers
export const isNumber = (evt) => {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
        evt.preventDefault();
    } else {
        return true;
    }
}

// only int numbers
export const isInt = (evt) => {
	evt = (evt) ? evt : window.event;

	const keyCode = [0, 8, 9, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
	const charCode = evt.which;

	if (!keyCode.includes(charCode)) {
		evt.preventDefault();
	} else {
		return true;
	}
}

// only float numbers with minus
export const isNumWithMinus = (evt) => {
	evt = (evt) ? evt : window.event;

	const keyCode = [0, 8, 9, 46, 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57];
	const charCode = evt.which;

	if (!keyCode.includes(charCode)) {
		evt.preventDefault();
	} else {
		return true;
	}
}

export const decimalNumbers = ($event, value) => {
    let keyCode = ($event.keyCode ? $event.keyCode : $event.which);

    // only allow number and one dot
    if ((keyCode < 48 || keyCode > 57) && (keyCode !== 46 || value.indexOf('.') != -1)) {
        $event.preventDefault();
    }

    // restrict to 2 decimal places
    if (value != null && (String(value).split('.').length > 1) && (value.split('.')[1].length > 1)) {
        $event.preventDefault();
    }
}
export const generateGeneralUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};
export const generateUUID = () => {
    // return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    //     let r = Math.random() * 16 | 0,
    //         v = c == 'x' ? r : (r & 0x3 | 0x8);
    //     return v.toString(16);
    // });
    return 'xxxxx'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
export const generateShortUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-y'.replace(/[xy]/g, (c) => {
        let r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
