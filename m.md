
> a-nodejs-reference-project@0.0.3 test C:\f\a-nodejs-reference-project
> mocha --opts test/mocha.opts test/mocha

# TOC
   - [Mocha Test Suite](#mocha-test-suite)
   - [Webserver Test Suite](#webserver-test-suite)
     - [Response html with 200](#webserver-test-suite-response-html-with-200)
     - [GET /](#webserver-test-suite-get-)
<a name=""></a>
 
<a name="mocha-test-suite"></a>
# Mocha Test Suite
should not generate output to console.

```js
done();
```

should be perfect.

```js
done();
```

<a name="webserver-test-suite"></a>
# Webserver Test Suite
<a name="webserver-test-suite-response-html-with-200"></a>
## Response html with 200
should be responded as html.

```js
request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
```

<a name="webserver-test-suite-get-"></a>
## GET /
should respond with property ok.

```js
request(app)
      .get('/')
      .end(function (err, res) {
        if (err) return done(err);
        should.exist(res);
        should.exist(res.body);
        res.should.have.property('ok', true);
        done();
      });
```

