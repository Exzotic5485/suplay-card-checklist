interface Env {}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    return new Response(context.params.image);
};
