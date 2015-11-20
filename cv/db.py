import urllib2
import json
import imagehash
import video
import re
import hashTest

def grabData():
	db = json.loads(urllib2.urlopen("http://testware.cloudapp.net:3000/getAllData").read())['data']
	# db = [{'redirect': 'google.com', 'videoHash': u'a'*128}]

	hashToUrl = {}

	for elem in db:
		url = elem['redirect']
		hashes = elem['videoHash']
		lst = tuple(imagehash.hex_to_hash(str(hashes[i:i+16])) for  i in range(0, len(hashes), 16))
		hashToUrl[lst] = url

	return hashToUrl


def find_best_match(vid):
	min_diff = float("inf")
	min_video = None
	for item in data.keys():
		matchrate = video.correlate_hash_list(vid, item)
		if matchrate < 15 and matchrate < min_diff:
			min_diff = matchrate
			min_video = item
	if not min_video:
		return min_video
	else:
		return data[min_video]

def extract_video(url):
	search = re.match(r'.*youtube.com/watch\?v=(.*)$', url, re.M|re.I)
	if search:
		video_id = search.group(1)
		return hashTest.hash_id(video_id)


