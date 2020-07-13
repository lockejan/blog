---
title: "Introduction"
date: 2020-07-02T13:16:02+02:00
draft: false
toc: false
tags: 

---
> "Success is not final, failure is not fatal: it is the courage to continue that counts."

I don't know about you but working on and with software I often find myself in a constant search for information to tackle domain specific problems.
Scraping together information from different sources can be tedious sometimes but usually helps me to understand a topic better.
But what do I do the next time the same situation occurs?

The point is, it often feels like that I am revisiting sites or posts I've already been to for a similar if not the same reason.
There is nothing wrong with that in the sense, that if you don't need it regularly you probably don't need to remember it by heart.
In alignment with that I wish I had shortcuts to the information I once found.

By writing things down I've experienced and learned, I get a better sense for my skill.
It helps me to reflect on the topic but also on keeping things somewhat organized.
Hence the idea of this blog was born and the attempt to aggregate such findings at one place to keep them handy.
Furthermore this is also a chance to help others in their search for answers. 

> Why don't you just use medium.com or dev.to for that?

I can't stand paywalls, so medium is a big no-no for me.
[dev.to][6] is nice and I might integrate [cross-posting][7] into my pipeline someday but not now.

So the idea of starting a blog has been on my mind for quite some time. 
Fortunately I finally managed to spin up a setup that I found simple and functional enough to achieve this.

I really like [clojure][1] and I am probably gonna switch to a clojure based solution in the future, but for now I found hugo to be the best quick solution.
Hugo is a popular static site generator and you might want to use it too if you are planning on starting a blog.
There are a lot of good reasons to use static site generators in favour of a full-fleged web-framework.
It's pretty fast, good on security and you can host it everywhere to name just a [few reasons][3].

This site is hosted on [gitlab.com][8] via [gitlab pages][4].
The template is still just as is and I did setup gitlabs CI/CD support to test my site on updates.
So each time I check in an update to gitlab the updated site runs through some tests and only gets online if
these pass.

You could easily use another service for that or even host it yourself, but gitlab pages is a pretty decent option in my opinion.

Furthermore other people are able to read this and maybe learn something through it as well.
Even if it's just a link to a better source to their question.
So if one my posts helped you in understanding a topic or getting a setup done, please let me know.

So if you are interested in programming, coffee or anything else of the things I've mentioned in my about section you should come back from time to time.

If you use [RSS][9] you can [subscribe][5] to my updates if you like.
I'm planning to put at least one post a month online.

It's a try so let's see where this is going.

Have a great day.

Ciao,
Jan

[1]: https://clojure.org/
[2]: https://gohugo.io/
[3]: https://www.strattic.com/jekyll-hugo-wordpress-pros-cons-static-site-generators/
[4]: https://docs.gitlab.com/ee/user/project/pages/
[5]: https://www.smittie.de/posts/index.xml
[6]: https://dev.to/
[7]: https://dev.to/beeman/automate-your-dev-posts-using-github-actions-4hp3
[8]: https://gitlab.com/lockejan/blog
[9]: https://en.wikipedia.org/wiki/RSS
