export const funquestionFormComponents = {
	formId: 'funquestion',
	title: 'Funquestion',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill funquestion title',
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
					value: 'fill funquestion description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
