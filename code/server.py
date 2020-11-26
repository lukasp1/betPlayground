from flask import Flask, request, json, jsonify
from flask_cors import CORS, cross_origin
from parseExcel import calculateTotalTeasedOccurences
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# curl localhost:5000/historicTeaserOccurences -H "Content-Type: application/json" --data '{"min":7,"max":7.5,"pointsTeased":6}'
# Input: JSON with min, max, pointsTeased
# Output: JSON with totalOccurences, numPositiveOccurences, array of Positive Occurences
@app.route('/historicTeaserOccurences', methods=['POST'])
@cross_origin()
def hello_world():
    json = request.json
    # TODO: add some validation for the min, max, pointsTeased values
    totalOccurences, totalPositiveOccurences, positiveOccurences = calculateTotalTeasedOccurences(json["min"], json["max"], json["pointsTeased"])
    positiveOccurenceRatio = totalPositiveOccurences / totalOccurences
    twoTeamTeaserOdds=positiveOccurenceRatio * positiveOccurenceRatio
    return jsonify(
        totalOccurences=totalOccurences,
        totalPositiveOccurences=totalPositiveOccurences,
        positiveOccurences=positiveOccurences,
        positiveOccurenceRatio=positiveOccurenceRatio,
        positiveOccurenceRatioTwoTimes=twoTeamTeaserOdds,
        positiveOccurenceRatioThreeTimes=twoTeamTeaserOdds * positiveOccurenceRatio,
        americanOddsTwoTeam=(twoTeamTeaserOdds * 100)/(1 - twoTeamTeaserOdds)
    )
