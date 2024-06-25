'use strict';

const formatters = require('./formatters');

const receipt = {
	config: {
		currency: '$',
		width: 50,
		ruler: '='
	},

	formatters: { },

	create(chunks) {
		return chunks.map((chunk) => {
			if (chunk.hasOwnProperty('type')) {
				return this.formatters[chunk.type](chunk, this.config);
			}

			return '';
		}).join('\n');
	},

	addFormatter(name, handler) {
		if (!this.formatters.hasOwnProperty(name)) {
			this.formatters[name] = handler.bind(this);
		} else {
			throw new Error('Formatter named "' + name + '" already exists.');
		}
	},

	addFormatters(formatters) {
		for (let name in formatters) {
			this.addFormatter(name, formatters[name]);
		}
	}
};

receipt.addFormatters({
	empty: formatters.empty,
	ruler: formatters.ruler,
	text: formatters.text,
	properties: formatters.properties,
	properties2: formatters.properties2,
	table: formatters.table
});

module.exports = receipt;