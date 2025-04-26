/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
        const data = await request.formData();
        const prompt = data.get('prompt');
        
        console.log(prompt);
        
	}
};