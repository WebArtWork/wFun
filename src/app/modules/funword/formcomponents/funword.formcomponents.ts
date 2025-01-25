export const funwordFormComponents = {
	formId: 'funword',
	title: 'Funword',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill funword title',
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
					value: 'fill funword description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
