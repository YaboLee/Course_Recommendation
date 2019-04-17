import nltk
from nltk.sentiment.vader import SentimentIntensityAnalyzer
# nltk.download('vader_lexicon')
view = ["His tests aren't easy passes, but that's because he actually cares that students are learning the material. If you attend his classes and read the book, you'll get the grade you deserve. You work for it, and you learn so much. His lectures are stories, never just a recitation of boring slides. His book is also an interesting read."]
sid = SentimentIntensityAnalyzer()
for sen in view:
    ss = sid.polarity_scores(sen)
    for k in ss:
        print(ss[k])