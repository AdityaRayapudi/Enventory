import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const expenses  = await request.json();
    console.log(expenses);

    return json({ registered: false });


    
}
