import { test, expect } from '@playwright/test';

let authToken: string;
test.beforeAll('run before all tests', async ({ request }) => {
  const tokenResponse = await request.post('https://conduit-api.bondaracademy.com/api/users/login',{
    data: {
    "user": {
        "email": "muniapitesting@test.com",
         "password": "Test@1234"
            }
          }
})
  const tokenResponseJSON = await tokenResponse.json();
  authToken = 'Token ' + tokenResponseJSON.user.token;
})
test('Get test tags', async ({ request }) => {
  const tagsResponse = await request.get('https://conduit-api.bondaracademy.com/api/tags');
  const tagsrResponseJSON = await tagsResponse.json();
  expect(tagsResponse.status()).toBe(200);
  expect(tagsrResponseJSON).toHaveProperty('tags');
  expect(tagsrResponseJSON.tags[0]).toBe('Test');
  expect(tagsrResponseJSON.tags.length).toBeLessThanOrEqual(10);
  //console.log(tagsrResponseJSON);
});

test('Article response', async ({ request }) => {
  const articleResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0');
  const articleResponseJSON = await articleResponse.json();
  expect(articleResponse.status()).toBe(200);
  expect(articleResponseJSON.articles.length).toBeLessThanOrEqual(10);
  expect(articleResponseJSON.articlesCount).toEqual(10);
  //console.log(articleResponseJSON);
});

test('Create and Delete the Article', async ({ request }) => {
  const newarticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      article: {
        title: 'MUNINDHAR',
        description: 'ok',
        body: 'okok',
        tagList: [],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });

  const newarticleResponseJSON = await newarticleResponse.json();
  expect(newarticleResponse.status()).toBe(201);
  expect(newarticleResponseJSON.article.title).toBe('MUNINDHAR');
  const slugId = newarticleResponseJSON.article.slug;

  const articleResponse = await request.get('https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', {
    headers: {
      Authorization: authToken,
    },
  });
  expect(articleResponse.status()).toBe(200);
  const articleResponseJSON = await articleResponse.json();
  expect(articleResponseJSON.articles[0].title).toEqual('MUNINDHAR');

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${slugId}`, {
    headers: {
      Authorization: authToken,
    },
  });
  expect(deleteArticleResponse.status()).toBe(204);
});

test('Create, Update and Delete the Article', async ({ request }) => {
  const newarticleResponse = await request.post('https://conduit-api.bondaracademy.com/api/articles', {
    data: {
      article: {
        title: 'RAGILLA',
        description: 'ok',
        body: 'okok',
        tagList: [],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });

  const newarticleResponseJSON = await newarticleResponse.json();
  expect(newarticleResponse.status()).toBe(201);
  expect(newarticleResponseJSON.article.title).toBe('RAGILLA');
  const newslugId = newarticleResponseJSON.article.slug;

  const updateArticleResponse = await request.put(`https://conduit-api.bondaracademy.com/api/articles/${newslugId}`, {
    data: {
      article: {
        title: 'HELLO WORLD & UNIVERSE',
        description: 'ok',
        body: 'okok',
        tagList: [],
      },
    },
    headers: {
      Authorization: authToken,
    },
  });

  const updateArticleResponseJSON = await updateArticleResponse.json();
  expect(updateArticleResponse.status()).toBe(200);
  expect(updateArticleResponseJSON.article.title).toEqual('HELLO WORLD & UNIVERSE');
  const updatedSlugId = updateArticleResponseJSON.article.slug;

  const articleResponse = await request.get(`https://conduit-api.bondaracademy.com/api/articles/${updatedSlugId}`, {
    headers: {
      Authorization: authToken,
    },
  });
  expect(articleResponse.status()).toBe(200);
  const articleResponseJSON = await articleResponse.json();
  expect(articleResponseJSON.article.title).toEqual('HELLO WORLD & UNIVERSE');

  const deleteArticleResponse = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${updatedSlugId}`, {
    headers: {
      Authorization: authToken,
    },
  });
  expect(deleteArticleResponse.status()).toBe(204);
});