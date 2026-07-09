import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
    const date = env.WHEN;
    const place = env.WHERE;

    return { date, place }
}
