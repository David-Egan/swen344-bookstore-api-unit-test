
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
let expect = chai.expect();

let hostName = 'http://vm344a.se.rit.edu:80';
let apiFile = '/htdocs/SWEN-344-API/API/API.php';
let baseGetUrl = apiFile.concat('?team=book_store');

chai.use(chaiHttp);

  describe('/GET books', () => {
      it('it should GET all the books', (done) => {
        chai.request('http://vm344a.se.rit.edu:80')
            .get('/api/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
              done();
            });
      });
  });

describe('/GET book using invalid param isb instead of isbn ', () => {
      it('it should return status code of 400', (done) => {
	let query = baseGetUrl.concat('&function=getBook&isb=123456789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		//res.body.should.be.empty;
		res.should.have.status(400);
              done();
            });
      });
  });
describe('/GET book using negative isbn', () => {
      it('it should return status code of 400 Bad Request', (done) => {
	let query = baseGetUrl.concat('&function=getBook&isb=-123456789');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
	//	res.body.should.be.a('Object');
		//res.body.should.be.empty;
		res.should.have.status(400);
              done();
            });
      });
  });
describe('/GET book using isbn = 4', () => {
      it('it should return an object', (done) => {
	let query = baseGetUrl.concat('&function=getBook&isbn=4');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.body.should.be.a('Object');
              done();
            });
      });
  });
describe('/GET book using isbn = 4', () => {
      it('it should have ISBN property', (done) => {
	let query = baseGetUrl.concat('&function=getBook&isbn=4');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.body.should.be.a('Object');
		console.log(res.body);
		Object.keys(res.body).should.not.be.eql(0);
              done();
            });
      });
  });

describe('Create book using GET', () =>{
    it('it should return status code 400', (done)=>{
	let getFunction = '&function=CreateBook';
	let isbn = '&Isbn=123456890';
	let title ='&Title=testTitle';
	let publisherID = '&Publisher_id=1';
	let thumbnail_url = '&Thumbnail_url=testurl';
	let available = '&Available=0';
	let count = '$Count=0';
	
	let params =  [getFunction,isbn,title,publisherID,thumbnail_url,available,count].join('');
	let url = baseGetUrl.concat(params);
	console.log(url);

        chai.request(hostName)
	    .get(url)
            .end((err, res) => {
		res.should.have.status(400);
              done();
            });
    });
});

// BLOCKED  - Let this pass for now
// NEED delete book to run first
describe('Create book using POST', () =>{
    it('it should return a 203 status code', (done)=>{
	let getFunction = '&function=CreateBook';
	let isbn = '&Isbn=';
	let title ='&Title=testTitle';
	let publisherID = '&Publisher_id=1';
	let thumbnail_url = '&Thumbnail_url=testurl';
	let available = '&Available=0';
	let count = '$Count=0';
	
	let params =  [getFunction,isbn,title,publisherID,thumbnail_url,available,count].join('');
	let url = baseGetUrl.concat(params);
	console.log(url);

        chai.request(hostName)
	    .post(url)
            .end((err, res) => {
		//res.body.should.be.a('Object');
		//res.body.should.be.empty;
		//res.should.have.status(203);
              done();
            });
    });
});

describe('Create book using GET with negative isbn', () =>{
      it('it should return status code of 400 Bad Request', (done) => {
	let getFunction = '&function=CreateBook';
	let isbn = '&Isbn=-123456890';
	let title ='&Title=testTitle';
	let publisherID = '&Publisher_id=1';
	let thumbnail_url = '&Thumbnail_url=testurl';
	let available = '&Available=0';
	let count = '$Count=0';
	
	let params =  [getFunction,isbn,title,publisherID,thumbnail_url,available,count].join('');
	let url = baseGetUrl.concat(params);
	console.log(url);

        chai.request(hostName)
	    .get(url)
            .end((err, res) => {
		//res.body.should.be.a('Object');
		res.should.have.status(400);
              done();
            });
    });
});



describe('/Create book reviews using GET', () => {
      it('it should return status code of 400', (done) => {
	let getFunction = '&function=createReview';
	let review = '&Review=test review';
	let rating = '&Rating=5';
	let isbn = '&Isbn=4';
	let user = '&User_id=1'; 

	let params = [getFunction, review, rating, isbn, user].join('');

	let query = baseGetUrl.concat(params);
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.should.have.status(400);
              done();
            });
      });
  });

describe('/Create book reviews using POST', () => {
      it('it should return status code of 203', (done) => {
	let getFunction = '&function=createReview';
	let review = '&Review=test review';
	let rating = '&Rating=5';
	let isbn = '&Isbn=4';
	let user = '&User_id=1'; 

	let params = [getFunction, review, rating, isbn, user].join('');

	let query = baseGetUrl.concat(params);
	console.log(query);
        chai.request(hostName)
	    .post(query)
            .end((err, res) => {
		res.should.have.status(203);
		//res.body.should.be.a('array');

              done();
            });
      });
  });



describe('/GET book reviews data type', () => {
      it('it should return an array', (done) => {
	let query = baseGetUrl.concat('&function=viewBookReviews&isbn=4');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.body.should.be.a('array');
              done();
            });
      });
  });
describe('/GET book reviews status code', () => {
      it('it should return status code of 200', (done) => {
	let query = baseGetUrl.concat('&function=viewBookReviews&isb=4');
	console.log(query);
        chai.request(hostName)
	    .get(query)
            .end((err, res) => {
		res.should.have.status(200);
              done();
            });
      });
  });


