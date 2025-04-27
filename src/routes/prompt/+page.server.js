import * as gem from '$lib/server/gemeni.js';

export async function load() {
    gem.connect()
}


/** @satisfies {import('./$types').Actions} */
export const actions = {
	default: async ({ request }) => {
        const data = await request.formData();
        const prompt = data.get('prompt');
        
        

        console.log(await gem.run(prompt));
        
	}
};