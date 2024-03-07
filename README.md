# EE303 Mobile Robotics Frontend

## How to change server ip address

1. Use "find and replace" to replace `http://3.250.38.184` with the new ip address

## How to build for deployment

1. Run `npm run build` this will create a dist folder in the root of the project. This should contain an assets folder, facivon.ico and index.html

## How to Deploy to AWS

1. Create S3 bucket

- Choose AWS Region - Europe (Ireland)eu-west 1
- Choose Bucket Name -
- Uncheck Block all public access
- Press Create

2. Enable static website hosting

- Press on previously created bucket
- Go to the Properties tab
- Under Static website hosting, choose Edit
- Choose Use this bucket to host a website.
- Under Static website hosting, choose Enable.
- In Index document and Error document, enter the file name of the index document, index.html.
- Choose Save changes.

3. Edit Block Public Access settings

- Go to Permissions tab
- Under Block public access (bucket settings), choose Edit.
- Clear Block all public access, and choose Save changes.

4. Add a bucket policy that makes your bucket content publicly available

- Under Buckets, choose the name of your bucket.
- Choose Permissions.
- Under Bucket Policy, choose Edit.
- To grant public read access for your website, copy the following bucket policy, and paste it in the Bucket policy editor. Change `BucketName` to the name of your bucket.

```
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Sid": "Statement1",
          "Effect": "Allow",
          "Principal": "*",
          "Action": "s3:GetObject",
          "Resource": "arn:aws:s3:::BucketName/*"
      }
  ]
}
```

- Choose Save changes

5. Upload Frontend Files

- Go to the objects tab
- Press upload
- Drag and drop all files and the folder in the dist folder
- Press upload

6. Retrieve the url form bottom of the properties tab

- You should be able to view this site now.
