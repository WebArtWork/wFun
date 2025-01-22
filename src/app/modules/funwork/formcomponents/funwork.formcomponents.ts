export const funworkFormComponents = {
	formId: 'funwork',
	title: 'Funwork',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill funwork title',
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
					value: 'fill funwork description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
