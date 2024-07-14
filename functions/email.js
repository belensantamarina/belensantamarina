export default async (request, context) => {

  const json = await request.json();

  const response = JSON.stringify({
    json,
    context,
  });

  return new Response(response);
};
