def build_track_object(**kwargs):
    track_object = {
        "album": {
            "album_type": "ALBUM",
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2"
                    },
                    "href": "https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2",
                    "id": "3WrFJ7ztbogyGnTHbHJFl2",
                    "name": "The Beatles",
                    "type": "artist",
                    "uri": "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2",
                }
            ],
            "available_markets": ["HK"],
            "external_urls": {
                "spotify": "https://open.spotify.com/album/7vEJAtP3KgKSpOHVgwm3Eh"
            },
            "href": "https://api.spotify.com/v1/albums/7vEJAtP3KgKSpOHVgwm3Eh",
            "id": "7vEJAtP3KgKSpOHVgwm3Eh",
            "images": [
                {
                    "height": 640,
                    "url": "https://i.scdn.co/image/ab67616d0000b273582d56ce20fe0146ffa0e5cf",
                    "width": 640,
                },
                {
                    "height": 300,
                    "url": "https://i.scdn.co/image/ab67616d00001e02582d56ce20fe0146ffa0e5cf",
                    "width": 300,
                },
                {
                    "height": 64,
                    "url": "https://i.scdn.co/image/ab67616d00004851582d56ce20fe0146ffa0e5cf",
                    "width": 64,
                },
            ],
            "name": "1 (Remastered)",
            "release_date": "2000-11-13",
            "release_date_precision": "day",
            "total_tracks": 27,
            "type": "album",
            "uri": "spotify:album:7vEJAtP3KgKSpOHVgwm3Eh",
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3WrFJ7ztbogyGnTHbHJFl2"
                },
                "href": "https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2",
                "id": "3WrFJ7ztbogyGnTHbHJFl2",
                "name": "The Beatles",
                "type": "artist",
                "uri": "spotify:artist:3WrFJ7ztbogyGnTHbHJFl2",
            }
        ],
        "available_markets": ["HK"],
        "disc_number": 1,
        "duration_ms": 145746,
        "explicit": False,
        "external_ids": {"isrc": "GBUM71505904"},
        "external_urls": {
            "spotify": "https://open.spotify.com/track/4pbG9SUmWIvsROVLF0zF9s"
        },
        "href": "https://api.spotify.com/v1/tracks/4pbG9SUmWIvsROVLF0zF9s",
        "id": "4pbG9SUmWIvsROVLF0zF9s",
        "is_local": False,
        "name": "I Want To Hold Your Hand - Remastered 2015",
        "popularity": 72,
        "preview_url": "https://p.scdn.co/mp3-preview/"
        + "d7e6b26957825e64b3546bd7365b74baa1ce3046?cid=774b29d4f13844c495f206cafdad9c86",
        "track_number": 4,
        "type": "track",
        "uri": "spotify:track:4pbG9SUmWIvsROVLF0zF9s",
    }
    track_object.update(kwargs)
    return track_object
