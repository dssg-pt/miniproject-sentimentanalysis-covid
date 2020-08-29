
import GetOldTweets3 as got
import csv



# Open/create a file to append data to
csvFile = open('result.csv', 'a')

#columns' names
columns = ["id","date","username","text","hashtag","geo"]

#Use csv writer
csvWriter = csv.writer(csvFile)
csvWriter.writerow(columns)

#tweet query - example here of searching for "corona virus and covid 19 keywords, dates, location, language and number of tweets. if set to 0 should retrieve all tweets"
tweetCriteria = got.manager.TweetCriteria().setQuerySearch("coronavirus covid19")\
                                           .setSince("2020-03-15")\
                                           .setUntil("2020-04-16")\
                                           .setNear("Lisbon,Portugal")\
                                           .setWithin("15mi")\
                                           .setLang("pt")\
                                           .setMaxTweets(30)
                                           
                                           
tweet = got.manager.TweetManager.getTweets(tweetCriteria)

# to csv
for i in tweet:
    csvWriter.writerow([i.id, i.date, i.username, i.text,i.hashtags, i.geo])
csvFile.close()


#Doesn't accept lists in setQuerySearch
#using Portugal as a location doesn't seem to work, the same with coordinates - doesn't look that accurate

