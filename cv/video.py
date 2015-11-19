from __future__ import unicode_literals
import youtube_dl

ydl_opts = {
	'format': 'best',
}
ydl = youtube_dl.YoutubeDL(ydl_opts)

test_id = 'KUfxaCyH2v0'

def youtubeDownload(video_id):
	ydl.download(['https://www.youtube.com/watch?v=' + video_id])
