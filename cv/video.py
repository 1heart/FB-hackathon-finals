from __future__ import unicode_literals
import youtube_dl, cv2
import os

ydl_opts = {
	'format': 'best',
}
ydl = youtube_dl.YoutubeDL(ydl_opts)

test_id = 'KUfxaCyH2v0'
curdir = os.getcwd()
dldir = 'dl/'

def youtube_download(video_id):
	os.chdir(dldir)
	ydl.download(['https://www.youtube.com/watch?v=' + video_id])
	os.chdir(curdir)

'''
Returns a cv2 VideoCapture object,
or None if the file doesn't exist.
'''
def get_youtube_video(video_id):
	for f in os.listdir(dldir):
		if video_id in f:
			return cv2.VideoCapture(dldir + f)



