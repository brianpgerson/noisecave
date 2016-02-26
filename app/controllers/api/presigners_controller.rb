require "s3_presigner"
class Api::PresignersController < ApplicationController

  def presign_upload
    render json: UploadPresigner.presign(params[:prefix], params[:filename], limit: 15.megabytes)
  end

end
