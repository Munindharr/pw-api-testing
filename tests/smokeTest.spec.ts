import { test} from '../utils/fixtures';
test('First Test',async ({ api }) => {
    api
        .url('https://conduit-api.bondaracademy.com/api')
        .path('/articles')
        .params({ limit: 10, offset: 0 })
        .headers({ Authorization: 'authToken' })
        .body({"user": {"email": "muniapitesting@test.com","password": "Test@1234"}})
        .getUrl();   
});