export const fungameFormComponents = {
	formId: 'fungame',
	title: 'Fungame',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill fungame title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill fungame description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
