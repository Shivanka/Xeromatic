using System.Collections.Generic;
using Tweetinvi;
using Tweetinvi.Core.Credentials;
//using Tweetinvi.Core.Interfaces;
using Tweet = Xeromatic.Models.Tweet;
using System.Linq;
using Xeromatic.Services;

namespace Xeromatic.Services
{
    public class TwitterApiService : ITwitterService //This TwitterApiService is based on the ITwitterService we created
    {
        // Get keys from: https://apps.twitter.com
        // Wiki for tweetinvi: https://github.com/linvi/tweetinvi/wiki

        readonly TwitterCredentials _creds;

        public TwitterApiService()
        {
            _creds = new TwitterCredentials
            {
                ConsumerKey = "cXvVYzwOaEvXeN2gGojHig1Mn",
                ConsumerSecret = "0gcsLMBCTRZdzwr21QyOUSSgk67ebKeJHBocStWtbESfKwVKYI",
                AccessToken = "718561418514071552-8u0byoec2uILbrqU5niKKlV7ourWWnY",
                AccessTokenSecret = "dFr4OD2lk2ktobMw7RaczWt2opcbZEXahVbQp3ojKG2tC"

            };
        }

        public IEnumerable<Tweet> GetTweets()
        {
            var tweets = 
                Auth.ExecuteOperationWithCredentials(_creds, () => Timeline.GetUserTimeline("xero", 10)).ToList();

            if
                (tweets.Any()) //if theres no tweets then we won't map anything
            {
                return tweets.Select(t => new Tweet
                {
                    Id = t.Id,
                    Text = t.Text

                });
            }
            return new List<Tweet>();
        }

    }
}