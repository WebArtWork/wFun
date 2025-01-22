export const funjokeFormComponents = {
	formId: 'funjoke',
	title: 'Funjoke',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill funjoke title',
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
					value: 'fill funjoke description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
