def s3_credentials(config, filename)
  creds = {
    endpointurl: "https://#{config['bucket']}.s3.amazonaws.com",
    params: s3_params(config, filename)
  }
  creds
end

def s3_params(config, filename)
  credential = amz_credential(config)
  policy = s3_upload_policy(config, filename, credential)
  policy_base64 = Base64.encode64(JSON.generate(policy))
  return {
    'key': "/brian/" + filename,
    'acl': 'public-read',
    'x-amz-date': date_string + "T000000Z",
    'success_action_status': '201',
    'policy': policy_base64,
    'x-amz-algorithm': 'AWS4-HMAC-SHA256',
    'x-amz-credential': credential,
    'x-amz-signature': s3_upload_signature(config, policy_base64, credential)
  }
end

def date_string
  date = Time.now.utc.iso8601
  return date[0,4] + date[5,2] + date[8,2]
end

def amz_credential(config)
  [config['access_key'], date_string, config['region'], 's3/aws4_request'].join('/')
end


def s3_upload_policy(config, filename, credential)
  policy = {
    expiration: (Time.now + (60 * 5)).utc.iso8601,
    conditions: [
      { bucket: config['bucket'] + '/' },
      { key: filename },
      { acl: 'public-read' },
      { success_action_status: '201' },
      ['content-length-range', 0, 1000000],
      { 'x-amz-algorithm': 'AWS4-HMAC-SHA256' },
      { 'x-amz-credential': credential },
      { 'x-amz-date': date_string + 'T000000Z' }
    ],
  }
end

def hmac(key, string)
  digest = OpenSSL::Digest.new('sha256')
  cool_hmac = OpenSSL::HMAC.digest(digest, key, string)
end

def s3_upload_signature(config, policy_base64, credential)
  digest = OpenSSL::Digest.new('sha256')

  date_key = hmac("AWS4#{config['secret_key']}", date_string)
  date_region_key = hmac(date_key, config['region'])
  date_region_service_key = hmac(date_region_key, "s3")
  signing_key = hmac(date_region_service_key, 'aws4_request')
  OpenSSL::HMAC.hexdigest(digest, signing_key, policy_base64)
end
