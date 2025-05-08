Today I have learnt about google Oauth working internal

First we generate google redirect link where user have to consent in for
sharing information that is requested by our app in this 
we have to use client_secret and client_id 

After consent form is done we get authorization token which is then used
to get access token and refresh token from google api.Needs to be same redirect_uri as
calling uri

When we get access token we use it for requesting userinfo as requested.