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
nfl_odds_file = 'nfl odds 2020-21.xlsx'
# Changes the current working directory up one
changed_dir = os.chdir('../files')
# writes the filename for parseExcelFile argument
path_to_excel_file = os.getcwd() +'/' + nfl_odds_file    

# Leaving this in for reference if you dont like it
#games = parseExcelFile('/Users/lukaspranciliauskas/git/betPlayground/files/nfl odds 2020-21.xlsx')
games = parseExcelFile(path_to_excel_file)

totalGames = len(games)
totalGamesOver7PointDiff = 0
totalGamesThatCovered = 0
for game in games:
    if game["closingSpread"] >= 7:
        totalGamesOver7PointDiff += 1
        if game["pointDifferential"] >= 1:
            totalGamesThatCovered += 1

print("Results:")
print(totalGamesOver7PointDiff)
print(totalGamesThatCovered / totalGamesOver7PointDiff)
