using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using Dapper;
using Xeromatic.Models;

namespace Xeromatic.Services
{
    public class TweetDbService : ITwitterService //branching ITwitterService to the TweetDbService, not duplicating code
    {
        private readonly string _connectionString = ConfigurationManager.ConnectionStrings["tweetDB"].ConnectionString;

        public IEnumerable<Tweet> GetTweets()
        {
            using (var connection = new SqlConnection(_connectionString))
            {
                return connection.Query<Tweet>(@"SELECT Id, Text FROM dbo.Tweet");
            }
        }

        public void InsertTweet(Tweet tweet)
        {
            // TODO Hint: check out the Dapper docs online. https://github.com/StackExchange/dapper-dot-net

            //connect to the database and then add data to it
            using (var connection = new SqlConnection(_connectionString)) //whatever we do in these curly braces is using this
                {
                connection.Execute("INSERT INTO dbo.Tweet VALUES (@id, @Text)", tweet); //mapping, can't pin the same tweet or it will catch an exception. Can unpin using another sql query 
                }
        }
    }
}