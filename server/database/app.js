var express = require('express');
var mongoose = require('mongoose');
var fs = require('fs');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
var port = 3030;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

var reviews_data = JSON.parse(fs.readFileSync('reviews.json', 'utf8'));
var dealerships_data = JSON.parse(fs.readFileSync('dealerships.json', 'utf8'));

mongoose.connect('mongodb://mongo_db:27017/', { dbName: 'dealershipsDB' });

var Reviews = require('./review');
var Dealerships = require('./dealership');

// Seed data
(function () {
  try {
    Reviews.deleteMany({}, function (error) {
      if (error) {
        console.error('Error deleting reviews:', error);
      }
    });
    Reviews.insertMany(reviews_data.reviews, function (error) {
      if (error) {
        console.error('Error inserting reviews:', error);
      }
    });

    Dealerships.deleteMany({}, function (error) {
      if (error) {
        console.error('Error deleting dealerships:', error);
      }
    });
    Dealerships.insertMany(dealerships_data.dealerships, function (error) {
      if (error) {
        console.error('Error inserting dealerships:', error);
      }
    });

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
})();

// Home route
app.get('/', function (req, res) {
  res.send('Welcome to the Mongoose API');
});

// Fetch all reviews
app.get('/fetchReviews', function (req, res) {
  Reviews.find({}, function (err, documents) {
    if (err) {
      res.status(500).json({ error: 'Error fetching documents' });
    } else {
      res.json(documents);
    }
  });
});

// Fetch reviews by dealer
app.get('/fetchReviews/dealer/:id', function (req, res) {
  Reviews.find({ dealership: req.params.id }, function (err, documents) {
    if (err) {
      res.status(500).json({ error: 'Error fetching documents' });
    } else {
      res.json(documents);
    }
  });
});

// Fetch all dealerships
app.get('/fetchDealers', function (req, res) {
  Dealerships.find({}, function (err, dealers) {
    if (err) {
      res.status(500).json({ error: 'Error fetching dealerships' });
    } else {
      res.json(dealers);
    }
  });
});

// Fetch dealers by state
app.get('/fetchDealers/:state', function (req, res) {
  var state = req.params.state;
  Dealerships.find({
    state: { $regex: new RegExp('^' + state + '$', 'i') }
  }, function (err, dealers) {
    if (err) {
      res.status(500).json({ error: 'Error fetching dealerships by state' });
    } else if (dealers.length > 0) {
      res.json(dealers);
    } else {
      res.status(404).json({ message: 'No dealers found in state ' + state });
    }
  });
});

// Fetch dealer by ID
app.get('/fetchDealer/:id', function (req, res) {
  var id = parseInt(req.params.id, 10);
  Dealerships.findOne({ id: id }, function (err, dealer) {
    if (err) {
      res.status(500).json({ error: 'Error fetching dealer by ID' });
    } else if (dealer) {
      res.json(dealer);
    } else {
      res.status(404).json({ message: 'Dealer with ID ' + id + ' not found' });
    }
  });
});

// Insert review
app.post('/insert_review', express.raw({ type: '*/*' }), function (req, res) {
  var data = JSON.parse(req.body);
  Reviews.find().sort({ id: -1 }).exec(function (err, documents) {
    if (err) {
      res.status(500).json({ error: 'Error fetching reviews for ID calculation' });
    } else {
      var new_id = documents.length > 0 ? documents[0].id + 1 : 1;

      var review = new Reviews({
        id: new_id,
        name: data.name,
        dealership: data.dealership,
        review: data.review,
        purchase: data.purchase,
        purchase_date: data.purchase_date,
        car_make: data.car_make,
        car_model: data.car_model,
        car_year: data.car_year
      });

      review.save(function (err, savedReview) {
        if (err) {
          res.status(500).json({ error: 'Error inserting review' });
        } else {
          res.json(savedReview);
        }
      });
    }
  });
});

// Start the server
app.listen(port, function () {
  console.log('Server is running on http://localhost:' + port);
});
