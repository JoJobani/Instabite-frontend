import instaClone from '../../assets/img/instaClone.png'
import Create from '../../assets/svg/Create.svg?react'

export function IndexHeader({ onClickUpload }) {

    return (
        <section className="index-header">
            <div className="left-header">
                <img src={instaClone} onClick={() => navigate(`/`)} />
            </div>
            <div className="right-header">
                <button className='link upload-btn' onClick={() => onClickUpload()}>
                    <Create />
                </button>
            </div>
        </section>
    )
}