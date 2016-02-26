require "s3_presigner"
class PresignersController < ApplicationController

  def presign_upload
    render json: UploadPresigner.presign("/tracks/", params[:filename], limit: 15.megabytes)
  end

end
