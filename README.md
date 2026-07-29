# personal-website-improved

A 2026 redesign of the personal site. Superseded. The live site is https://gabrieldalton.com.

Five HTML files and no framework. `home.html` is one file of roughly 80KB carrying About Me, Resume, Portfolio and Contact as panels on a single page. `references.html` collects letters of recommendation, `headshots.html` offers press photos for download, and `message-sent.html` and `under-maintenance.html` cover the contact form response and downtime.

`assets/` is most of the weight: project screenshots under `assets/projects/`, client logos, favicons, icon sets, and the CSS and JS the pages load. A hosted newsletter widget comes in from Supascribe and Substack.

## Run it

Stylesheets and scripts are linked from the site root as `/assets/...`, so opening a file from disk leaves the page unstyled. Serve the folder root over HTTP and open `/home.html`.
