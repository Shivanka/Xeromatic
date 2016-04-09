//React component that takes in some text as a property and displays it
var Tweet = React.createClass({
	render: function() {
	    return ( //suround with brackets when returning more than one line of code  //rendering a list item in next line
	    <li className="list-group-item">    
        {this.props.text}
	    {this.props.children}
	    </li>  
	   
        )
	}
});

var Button = React.createClass({
    render: function() {
        return <button className="btn btn-info pull-right">{this.props.label} </button> 
        //renders a button item, DO NOT SPACE AFTER ASSIGNING A VALUE (=) IN HTML AND JS!! eg. ___= "hi' should be ___="hi"
    }
});


//React component that makes a call to the API in the HomeController. If more than one tweet is returned, it displays a Tweet component for each.
var App = React.createClass({
    //React function that sets the initial state of the app (where changeable data is stored)
    getInitialState: function() {
        return {
            recentTweets: [],
            pinnedTweets: [] //empty array
        };
    },

    //React function that runs after the app first loads
    componentDidMount: function() {
        var self = this;
        var recentFetch = fetch('/recentTweets', {method: 'get'}) //fetching everything from /recentTweets url using get method, to commence with next line
			.then(function(response) {
			    return response.json();
			})

        var pinnedFetch = fetch('/pinnedTweets', {method: 'get'}) //fetching everything from /pinnedTweets url using get method, to commence with next line
			.then(function(response) {
			    return response.json();
			})

        Promise.all([recentFetch, pinnedFetch]) //following six lines is valid for recentFetch and pinnedFetch hence is combined here!
			.then(function(data) {
			    self.setState({recentTweets: data[0], pinnedTweets: data[1]}); 
			})
			.catch(function(error) { //incase there are errors
			    console.error('Error', error);
			});
    },

    //React function that runs on first load and whenever the state is changed
    render: function() {
        var pinnedTweets = (this.state.pinnedTweets.length > 0) ? this.state.pinnedTweets.map(function(tweet) { //if we have pinned tweets hence >0
            return <Tweet key={tweet.Id} text={tweet.Text} /> //return pinned tweet/s
            })
			: null;

        var recentTweets = (this.state.recentTweets.length > 0) ? this.state.recentTweets.map(function(tweet) { //if we have recent tweets hence >0
            return (

                <Tweet key={tweet.Id} text={tweet.Text} > //return recent tweet/s
		            <Button label="Pin" /> //lets people pin their tweets - Pin button
                </Tweet>
            )
            })
        : null;

		return (
			<div className="container">
				<h2>Welcome to the Xeromatic!</h2>
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Pinned Tweets</h3>
					</div>
					<ul className="list-group">{pinnedTweets}</ul>
				</div>
                <div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Recent Tweets</h3>
					</div>
					<ul className="list-group">{recentTweets}</ul>
				</div>
			</div>
		);
	}
});

//This function will render our App to the page
ReactDOM.render(<App />, document.getElementById('app'));