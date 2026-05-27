'use strict';

function update() {
	const accumulator = (acc, checkbox) => Object.assign(acc, { [checkbox.name]: checkbox.checked });
	const include = Array.from(document.getElementsByTagName('input')).reduce(accumulator, {});

	if (Object.values(include).reduce((acc, val) => acc + (val ? 1 : 0), 0) >= 2) {
		browser.storage.local.set({ include });
		browser.runtime.sendMessage({ include }).catch(() => {
			// Background may be suspended (non-persistent event page); ignore rejection.
			// The storage write above already persisted the preference.
		});
		document.getElementById('more-values-needed').style.display = 'none';
	} else {
		document.getElementById('more-values-needed').style.display = 'block';
	}
}

browser.storage.local.get({ include: {} }).then(({ include }) => {
	Array.from(document.getElementsByTagName('input')).forEach(checkbox => {
		checkbox.checked = include[checkbox.name];
		checkbox.addEventListener('change', update);
	});
}).catch(console.error);
