import React from 'react'

const Contact = () => {
    return (
        <div className='row' style={{ width: '100%', padding: '70px 0', backgroundColor: 'black', margin: '0px', marginTop: '70px' }}>
            <div className='col-sm-6 col-md-8 col-lg-7'>
                <div className='callout-text font-alt'>
                    <h3 class="callout-title">Đăng ký ngay?</h3>
                    <p>Chúng tôi sẽ không spam email của bạn.</p>
                </div>
            </div>
            <div className='col-sm-6 col-md-4 col-lg-5'>
                <div className='callout-btn-box'>
                    <form role="form" method="post" action="">
                        <div class="input-group" style={{ left: '5px' }}>
                            <input class="form-control" type="email" id="semail" name="semail" placeholder="Your Email" data-validation-required-message="Please enter your email address." required="required" />
                            <span class="input-group-btn">
                                <button class="btn btn-contact" id="subscription-form-submit" type="submit" style={{ margin: '0px' }}>
                                    Submit
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact