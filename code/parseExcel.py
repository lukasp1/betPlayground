import pandas as pd
import datetime
import pdb
import os

# Main function to parse excel file
def parseExcelFile(fileName):
    ex_data = pd.read_excel(fileName)
    df = pd.DataFrame(ex_data, columns=['Date', 'Team', 'VH', 'Final', 'Open', 'Close', 'ML'])
    teamTotals = dict()
    games = []
    date = None
    for index, row in df.iterrows():
        # HACK to parse 2 teams at a time
        if index % 2 != 0:
            continue

        # TODO: handle pick em logic
        if df['Close'].iloc[index] == 'pk' or df['Close'].iloc[index + 1] == 'pk':
            continue

        # There should probably be a better way to do this,
        # but need to find index of underdog as well as favorite
        randomML = int(df['ML'].iloc[index])
        randomML2 = int(df['ML'].iloc[index + 1])

        if randomML < 0 and randomML2 < 0:
            # Both teams have - odds, need to do extra logic to determine favorite
            # Here lesser is better
            if randomML < randomML2:
                indexOfFavorite = index
                indexOfUnderdog = index + 1
            else:
                indexOfFavorite = index + 1
                indexOfUnderdog = index
        elif randomML < 0:
            indexOfFavorite = index
            indexOfUnderdog = index + 1
        else:
            indexOfFavorite = index + 1
            indexOfUnderdog = index

        spread = int(df['Close'].iloc[indexOfFavorite])
        underdogTotalScore = int(df['Final'].iloc[indexOfUnderdog])
        favoriteTotalScore = int(df['Final'].iloc[indexOfFavorite])
        pointDifferential = favoriteTotalScore - underdogTotalScore

        games.append({
            "closingSpread": spread,
            "underdogTeam": str(df['Team'].iloc[indexOfUnderdog]),
            "underdogTotalScore": underdogTotalScore,
            "favoriteTeam": str(df['Team'].iloc[indexOfFavorite]),
            "favoriteTotalScore": favoriteTotalScore,
            "pointDifferential": pointDifferential,
            "didCover": pointDifferential > spread
        })

    return games

# Name of Excel sheet you want
nfl_odds_files = [
    'nfl odds 2007-08.xlsx',
    'nfl odds 2008-09.xlsx',
    'nfl odds 2009-10.xlsx',
    'nfl odds 2010-11.xlsx',
    'nfl odds 2011-12.xlsx',
    'nfl odds 2012-13.xlsx',
    'nfl odds 2013-14.xlsx',
    'nfl odds 2014-15.xlsx',
    'nfl odds 2015-16.xlsx',
    'nfl odds 2016-17.xlsx',
    'nfl odds 2017-18.xlsx',
    'nfl odds 2018-19.xlsx',
    'nfl odds 2019-20.xlsx',
    'nfl odds 2020-21.xlsx',
]
# Changes the current working directory up one
changed_dir = os.chdir('../files')

games = []
for nfl_odds_file in nfl_odds_files:
    # writes the filename for parseExcelFile argument
    path_to_excel_file = os.getcwd() +'/' + nfl_odds_file
    games.extend(parseExcelFile(path_to_excel_file))

def calculateTotalTeasedOccurences(min, max, pointsTeased):
    totalOccurences = 0
    # We consider an occurence "positive" if
    totalPositiveOccurences = 0
    positiveOccurences = []
    for game in games:
        if game["closingSpread"] >= min and game["closingSpread"] <= max:
            totalOccurences += 1
            if game["pointDifferential"] > game["closingSpread"] - pointsTeased:
                totalPositiveOccurences += 1
                positiveOccurences.append(game)
    return totalOccurences, totalPositiveOccurences, positiveOccurences
