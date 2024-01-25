var noteDataArray = []

// define monkey patch function
var monkeyPatch = () => {
    let oldXHROpen = window.XMLHttpRequest.prototype.open;
    window.XMLHttpRequest.prototype.open = function () {
      this.addEventListener('load', function () {
        if(this.responseURL.includes('BirdwatchFetchNotes')){
            noteDataArray = []
            json = JSON.parse(this.responseText)
            //console.log(json)
            misleading = json.data.tweet_result_by_rest_id.result.misleading_birdwatch_notes
            if(misleading){
                misleading = json.data.tweet_result_by_rest_id.result.misleading_birdwatch_notes.notes
            }else{
                misleading = json.data.tweet_result_by_rest_id.result.tweet.misleading_birdwatch_notes.notes
            }
            for (const note of misleading){
                profile = note.birdwatch_profile
                created_at = note.created_at
                alias = profile.alias
                writingImpacts = profile.notes_count.currently_rated_helpful - profile.notes_count.currently_rated_not_helpful
                ratingImpacts = profile.ratings_count.successful.total - profile.ratings_count.unsuccessful.total - profile.ratings_count.unsuccessful.not_helpful_count
                noteDataArray.push({
                    "created_at": created_at,
                    "alias": alias,
                    "writingImpacts": writingImpacts,
                    "ratingImpacts": ratingImpacts
                })
            }
            notMisleading = json.data.tweet_result_by_rest_id.result.not_misleading_birdwatch_notes
            if(notMisleading){
                notMisleading = json.data.tweet_result_by_rest_id.result.not_misleading_birdwatch_notes.notes
            }else{
                notMisleading = json.data.tweet_result_by_rest_id.result.tweet.not_misleading_birdwatch_notes.notes
            }
            for (const note of notMisleading){
                profile = note.birdwatch_profile
                created_at = note.created_at
                alias = profile.alias
                writingImpacts = profile.notes_count.currently_rated_helpful - profile.notes_count.currently_rated_not_helpful
                ratingImpacts = profile.ratings_count.successful.total - profile.ratings_count.unsuccessful.total - profile.ratings_count.unsuccessful.not_helpful_count
                noteDataArray.push({
                    "created_at": created_at,
                    "alias": alias,
                    "writingImpacts": writingImpacts,
                    "ratingImpacts": ratingImpacts
                })
            }
            setTimeout(sendToContentScript, 100)
        }else if(this.responseURL.includes('BirdwatchFetchOneNote')){
            noteDataArray = []
            json = JSON.parse(this.responseText)
            profile = json.data.birdwatch_note_by_rest_id.birdwatch_profile
            created_at = note.created_at
            alias = profile.alias
            writingImpacts = profile.notes_count.currently_rated_helpful - profile.notes_count.currently_rated_not_helpful
            ratingImpacts = profile.ratings_count.successful.total - profile.ratings_count.unsuccessful.total - profile.ratings_count.unsuccessful.not_helpful_count
            noteDataArray.push({
                "created_at": created_at,
                "alias": alias,
                "writingImpacts": writingImpacts,
                "ratingImpacts": ratingImpacts
            })
            setTimeout(sendToContentScript, 100)
        }
      });
      return oldXHROpen.apply(this, arguments);
    };
  };
  monkeyPatch();

  function sendToContentScript(){
    window.dispatchEvent(new CustomEvent('note_load', {
        detail: { "notes": noteDataArray }
    }))
  }