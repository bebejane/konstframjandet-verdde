import s from './Footer.module.scss'
import cn from 'classnames'
import type { MenuItem } from '/lib/menu'
import KFLogo from '/public/images/kf-logo.svg'
import { PROJECT_NAME } from '/lib/constant'

export type FooterProps = {
	menu: MenuItem[]
	footer: GeneralRecord
}

export default function Footer({ menu, footer: { email, facebook, instagram, about } }: FooterProps) {

	return (
		<footer className={cn(s.footer)} id="footer">
			<section>
				<div>
					Copyright {PROJECT_NAME}, 2023 <br />
					<a href={`mailto:${email}`}>{email}</a>Cookies & GDPR
				</div>
				<div>
					Följ oss: <a href={instagram}>Instagram</a>
				</div>
				<div>
					{about}
				</div>
				<KFLogo className={s.kf} />
			</section>
		</footer>
	)
}