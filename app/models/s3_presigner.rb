require "aws-sdk"
require "singleton"

class UploadPresigner

  include Singleton

  def self.presign(prefix, filename, limit: limit)
    extname = File.extname(filename).downcase
    filename = "#{SecureRandom.uuid}#{extname}"
    upload_key = Pathname.new(prefix).join(filename).to_s

    creds = Aws::Credentials.new(ENV['AWS_access_key'], ENV['AWS_secret_key'])
    s3 = Aws::S3::Resource.new(region: 'us-west-1', credentials: creds)
    obj = s3.bucket('briansdopetracks').object(upload_key)
    params = { acl: 'public-read' }
    params[:content_length] = limit if limit

    {
      presigned_url: obj.presigned_url(:put, params),
      public_url: obj.public_url
    }
  end

end
