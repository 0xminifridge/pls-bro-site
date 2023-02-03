import { useState } from "react";
// import getUsernameForAddress from "./util/usernames";
import {
  forwardLookupAvvy,
  forwardLookupfire,
  getUsernameForAddress,
  lookupAvvy,
  lookupFire,
} from "./util/usernames";
import { ethers } from "ethers";
import { parseWalletAddress } from "./util/walletUtil";

/**
 * search on 0x
 * search on .avax
 * search on .fire
 * search on .moo
 * search on .fires
 * search on .avaxe
 * search on 0xaaa
 */

export function ValidSearch({
  forwardLookup,
  reverseLookup,
  addressforAvvy,
  addressForFire,
  avvyDomain,
  validAvvy,
  dotFireDomain,
  validFire,
  address,
}) {
  console.log(
    forwardLookup,
    reverseLookup,
    addressforAvvy,
    addressForFire,
    avvyDomain,
    validAvvy,
    dotFireDomain,
    validFire
  );
  if (forwardLookup) {
    return (
      <ValidForwardLookup
        addressforAvvy={addressforAvvy}
        addressForFire={addressForFire}
      />
    );
  }
  if (reverseLookup) {
    console.log("reverse");
    return (
      <ValidReverseLookup
        avvyDomain={avvyDomain}
        validAvvy={validAvvy}
        dotFireDomain={dotFireDomain}
        validFire={validFire}
        address={address}
      />
    );
  }
  return <></>;
}

export function ValidReverseLookup({
  avvyDomain,
  validAvvy,
  dotFireDomain,
  validFire,
  address,
}) {
  return (
    <div class="">
      {avvyDomain && <h3>Registered .avax: {avvyDomain}</h3>}
      {!validAvvy && (
        <h3>
          No .avax domain registered. Get one{" "}
          <a
            class="hover:underline text-white"
            href="https://app.avvy.domains/register"
          >
            here
          </a>
          !
        </h3>
      )}
      {dotFireDomain && <h3>Registered .fire/.moo: {dotFireDomain}</h3>}
      {!validFire && (
        <h3>
          No .fire domain registered. Get one{" "}
          <a
            class="hover:underline text-white"
            href="https://campfire.exchange/minting/fire"
          >
            here
          </a>
          !
        </h3>
      )}
      {address && (
        <h3 class="flex flex-row items-center justify-center">
          <a
            href={`https://www.nftinsights.pro/accounts/${address}/overview`}
            target="_blank"
            class="hover:text-white flex flex-row items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class=" w-10 h-10 inline mt-[-2px]"
            >
              <path
                fill-rule="evenodd"
                d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            NFT Insights
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </h3>
      )}
    </div>
  );
}

export function ValidForwardLookup({ addressforAvvy, addressForFire }) {
  return (
    <div class="w-60 break-words m-auto">
      {addressforAvvy && (
        <h3 class="hover:text-white flex flex-row">
          <a
            class="flex flex-row items-center justify-center m-auto"
            target="_blank"
            href={`https://snowtrace.io/address/${addressforAvvy}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              class=" w-5 h-10 inline mt-[-2px] mr-[5px]"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.3704 1.26798V0C11.7092 0.000292182 13.0238 0.35623 14.1799 1.03142C15.3359 1.7066 16.2919 2.67681 16.9499 3.84273C17.6079 5.00865 17.9444 6.32845 17.9248 7.66709C17.9052 9.00574 17.5305 10.3151 16.8387 11.4614L15.7536 10.8049C16.329 9.85106 16.6407 8.76146 16.657 7.64754C16.673 6.53365 16.393 5.43549 15.8454 4.46537C15.2978 3.49525 14.5023 2.688 13.5403 2.12621C12.5783 1.56442 11.4844 1.26825 10.3704 1.26798ZM10.5059 8.82852L10.5078 8.8157C10.5096 8.8035 10.5114 8.79121 10.5128 8.77899C10.5148 8.76263 10.5162 8.74539 10.5175 8.72874C10.5204 8.69762 10.5222 8.6665 10.5235 8.63567C10.5235 8.62194 10.5235 8.6085 10.5245 8.59491C10.5245 8.59003 10.5248 8.58523 10.5251 8.58041C10.5254 8.57555 10.5257 8.57068 10.5257 8.56569V8.54757C10.5257 8.5131 10.5238 8.47862 10.5214 8.44428C10.5214 8.439 10.5209 8.43394 10.5204 8.42884V8.42883L10.5198 8.42208L10.5182 8.40498C10.5173 8.39023 10.5163 8.37576 10.515 8.36145C10.5112 8.3277 10.5061 8.29409 10.5005 8.26064L10.4986 8.25027L10.4935 8.2228L10.4905 8.20576L10.4905 8.20565C10.4888 8.19563 10.4871 8.18575 10.485 8.17605C10.4785 8.14581 10.4709 8.116 10.4628 8.08649L10.4585 8.07173L10.4533 8.0523L10.447 8.03004C10.4436 8.01818 10.4403 8.00631 10.4365 7.99445C10.4298 7.97354 10.4223 7.95283 10.4147 7.93181L10.4104 7.91994C10.4073 7.91167 10.404 7.9034 10.4007 7.89519L10.4006 7.89505L10.3977 7.88765L10.3889 7.86509C10.3831 7.85003 10.3774 7.83498 10.3709 7.82028C10.3628 7.80178 10.3554 7.78616 10.3476 7.76984L10.343 7.76037C10.3376 7.74911 10.3319 7.73804 10.3262 7.72702L10.3261 7.72688L10.3198 7.7147L10.3143 7.70373C10.3064 7.68805 10.2985 7.67235 10.2897 7.65667C10.2873 7.65222 10.2851 7.64773 10.2828 7.64324C10.2806 7.63875 10.2784 7.63425 10.276 7.6298C10.2734 7.62496 10.2701 7.62041 10.2669 7.61586C10.2642 7.61204 10.2615 7.60823 10.2592 7.60426C10.2507 7.58965 10.2418 7.57616 10.2327 7.56251L10.224 7.54916C10.2148 7.53465 10.2056 7.5203 10.1961 7.50638C10.1836 7.48819 10.1709 7.46964 10.1573 7.45146C10.1475 7.4382 10.1362 7.42422 10.125 7.41042L10.125 7.41041L10.1126 7.39517C10.1112 7.39349 10.1098 7.39175 10.1085 7.38998C10.1069 7.38791 10.1053 7.3858 10.1037 7.38369C10.0996 7.37812 10.0955 7.37259 10.091 7.36792L10.091 7.36788C10.074 7.34758 10.0571 7.32729 10.0396 7.30758C10.0324 7.29981 10.025 7.29229 10.0176 7.28479L10.0175 7.28474C10.0109 7.27808 10.0043 7.27143 9.99795 7.26462L9.98393 7.24992L9.97385 7.23949L9.96938 7.2351C9.94882 7.2149 9.92832 7.19476 9.90693 7.17545C9.8951 7.16463 9.88253 7.1544 9.87012 7.14435C9.86538 7.14008 9.86051 7.1359 9.85559 7.13169C9.85338 7.1298 9.85115 7.12789 9.84893 7.12597L9.84133 7.11936C9.81504 7.09809 9.78859 7.07701 9.76127 7.0567C9.75492 7.05213 9.74836 7.04763 9.7418 7.04312L9.72489 7.03138L9.71087 7.0219L9.69275 7.00953C9.66412 6.99018 9.63475 6.97081 9.60553 6.95438L9.60015 6.95083C9.59682 6.94862 9.59346 6.94638 9.59005 6.94437C9.58772 6.94304 9.58528 6.94179 9.5828 6.94058C9.58104 6.93972 9.57927 6.93889 9.57751 6.93806C9.57232 6.93561 9.5672 6.9332 9.56287 6.93043L9.52883 6.91107C9.50253 6.89734 9.47638 6.8838 9.44935 6.87141L9.44929 6.87138C9.43236 6.86347 9.41544 6.85556 9.39851 6.84841L9.38508 6.84283C9.37382 6.83816 9.36369 6.83397 9.35278 6.82905L9.34137 6.82449L9.34134 6.82448C9.3242 6.81761 9.30688 6.81067 9.28908 6.80451H9.28748V0.0171204H8.01942V1.92918L6.72086 0.631024L5.82421 1.52767L8.01942 3.72268V6.80451H8.01689C7.99581 6.81243 7.97493 6.82074 7.95385 6.82905L7.95362 6.82915C7.93862 6.83512 7.9236 6.8411 7.90859 6.84841C7.8991 6.85304 7.88806 6.85798 7.8769 6.86299L7.85734 6.87183C7.83046 6.88422 7.80414 6.89772 7.77785 6.91145L7.77525 6.91286C7.76473 6.91857 7.75435 6.9242 7.74398 6.93081C7.73739 6.93502 7.7322 6.93736 7.72723 6.93959C7.72375 6.94116 7.72038 6.94267 7.71672 6.94475C7.71443 6.94609 7.71227 6.94756 7.71014 6.94901L7.71013 6.94902C7.70703 6.95113 7.70398 6.9532 7.70066 6.9548C7.67106 6.9726 7.64265 6.99096 7.61382 7.00991L7.59604 7.0219L7.58928 7.0269L7.5754 7.03627C7.56555 7.04289 7.55575 7.04948 7.54614 7.05632C7.51867 7.07682 7.4918 7.09812 7.46511 7.12017L7.45794 7.12635L7.451 7.13197L7.44479 7.13716L4.77572 5.59644L3.97229 2.59857L2.74721 2.92741L3.22263 4.70134L1.56626 3.74472L0.932047 4.84291L2.58823 5.79934L0.814453 6.27436L1.14326 7.49961L4.14113 6.69599L6.8102 8.23668L6.80188 8.28299C6.79801 8.30987 6.79436 8.3369 6.79145 8.36422C6.7904 8.37257 6.78976 8.38091 6.78912 8.38929L6.78912 8.38931L6.78777 8.40557L6.78651 8.41958C6.78492 8.43713 6.78332 8.45471 6.78255 8.47248C6.7812 8.49834 6.78061 8.52464 6.78061 8.54977C6.78061 8.55303 6.78036 8.55615 6.78012 8.55921L6.78012 8.55922C6.77988 8.56218 6.77965 8.56509 6.77965 8.56803C6.77965 8.57098 6.77988 8.5739 6.78012 8.57685L6.78012 8.57687C6.78029 8.57898 6.78046 8.58112 6.78055 8.58329C6.78059 8.58423 6.78061 8.58518 6.78061 8.58614C6.78061 8.61215 6.78061 8.63801 6.78255 8.66358L6.7841 8.68436C6.7853 8.70071 6.78638 8.71537 6.78777 8.73151L6.78914 8.74791C6.78977 8.7562 6.7904 8.7645 6.79145 8.77286C6.79436 8.7993 6.79763 8.82604 6.80188 8.85277C6.80331 8.8624 6.80511 8.87208 6.80691 8.88178L6.8102 8.89996L4.14113 10.4409L1.14326 9.63717L0.814453 10.8621L2.58823 11.3375L0.932047 12.2932L1.56626 13.392L3.22263 12.4355L2.74721 14.2092L3.97229 14.538L4.77572 11.5402L7.44479 9.9995L7.45174 10.005L7.4564 10.0091L7.46626 10.0173C7.49258 10.0388 7.51867 10.0598 7.54632 10.0797C7.55355 10.0852 7.56093 10.0901 7.56835 10.0951L7.56837 10.0951C7.57545 10.0999 7.58257 10.1047 7.58964 10.1099L7.59449 10.1132L7.60478 10.1202L7.6152 10.1273C7.64304 10.1466 7.67168 10.1643 7.70088 10.1812C7.70321 10.1826 7.7054 10.1841 7.70757 10.1856C7.71063 10.1877 7.71364 10.1898 7.71692 10.1915C7.72368 10.1956 7.73065 10.1992 7.73766 10.2028L7.75038 10.2094C7.75978 10.2147 7.76565 10.2177 7.77232 10.2211L7.77631 10.2232L7.78712 10.2293L7.80312 10.2377C7.81477 10.2438 7.82644 10.2499 7.83838 10.2556C7.8612 10.2668 7.88415 10.2769 7.90714 10.287L7.91885 10.2921L7.92697 10.2958C7.94378 10.3031 7.96042 10.3091 7.97745 10.3151L8.00471 10.3254L8.01942 10.331V13.4119L5.82421 15.6072L6.72086 16.5039L8.01942 15.2053V17.1178H9.28748V15.2053L10.5857 16.5039L11.4826 15.6072L9.28762 13.4119V10.331L9.30209 10.3254L9.32985 10.3151L9.35322 10.3061C9.36208 10.3027 9.37097 10.2994 9.37981 10.2958L9.38872 10.2917C9.41531 10.2802 9.4419 10.2685 9.4682 10.2558C9.48588 10.247 9.50312 10.2379 9.52007 10.2289L9.53015 10.2235C9.53906 10.2186 9.54797 10.2141 9.55688 10.2091C9.56194 10.2062 9.5684 10.2029 9.5751 10.1994L9.57511 10.1994L9.59034 10.1913C9.591 10.1909 9.59165 10.1906 9.59231 10.1901C9.59429 10.1889 9.59625 10.1875 9.59825 10.1861L9.59826 10.1861C9.60072 10.1844 9.60322 10.1826 9.60582 10.1811C9.63504 10.164 9.66383 10.146 9.69158 10.1273L9.71248 10.1124L9.71759 10.1091L9.72169 10.1063C9.73466 10.0976 9.74772 10.0888 9.76054 10.0794C9.78714 10.0604 9.81318 10.0393 9.83893 10.0184L9.83898 10.0183L9.8406 10.017L9.85083 10.0081L9.85551 10.004L9.86208 9.99891L12.5311 11.5395L13.3347 14.5374L14.5596 14.2087L14.0842 12.4349L15.7403 13.3916L16.3745 12.2928L10.4964 8.89938C10.4981 8.88508 10.5 8.87149 10.5019 8.85816L10.5019 8.85807L10.5059 8.82852ZM13.7718 8.84401C14.0325 8.3784 14.1669 7.85263 14.1616 7.319C14.1565 6.78534 14.0117 6.26233 13.742 5.80189C13.4722 5.34143 13.0866 4.95953 12.6236 4.69411C12.1607 4.42868 11.6363 4.28895 11.1026 4.28878V5.55681C11.415 5.55705 11.7219 5.6389 11.9928 5.79427C12.2638 5.94965 12.4894 6.17316 12.6475 6.4426C12.8054 6.71205 12.8903 7.01805 12.8935 7.33038C12.8967 7.6427 12.8184 7.95047 12.666 8.22309L13.7718 8.84401Z"
                fill="current"
              ></path>
            </svg>
            {parseWalletAddress(addressforAvvy)}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </h3>
      )}
      {addressForFire && (
        <h3 class="hover:text-white flex flex-row">
          <a
            class="flex flex-row items-center justify-center m-auto"
            target="_blank"
            href={`https://snowtrace.io/address/${addressForFire}`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 16"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              focusable="false"
              class=" w-5 h-10 inline mt-[-2px] mr-[5px]"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.3704 1.26798V0C11.7092 0.000292182 13.0238 0.35623 14.1799 1.03142C15.3359 1.7066 16.2919 2.67681 16.9499 3.84273C17.6079 5.00865 17.9444 6.32845 17.9248 7.66709C17.9052 9.00574 17.5305 10.3151 16.8387 11.4614L15.7536 10.8049C16.329 9.85106 16.6407 8.76146 16.657 7.64754C16.673 6.53365 16.393 5.43549 15.8454 4.46537C15.2978 3.49525 14.5023 2.688 13.5403 2.12621C12.5783 1.56442 11.4844 1.26825 10.3704 1.26798ZM10.5059 8.82852L10.5078 8.8157C10.5096 8.8035 10.5114 8.79121 10.5128 8.77899C10.5148 8.76263 10.5162 8.74539 10.5175 8.72874C10.5204 8.69762 10.5222 8.6665 10.5235 8.63567C10.5235 8.62194 10.5235 8.6085 10.5245 8.59491C10.5245 8.59003 10.5248 8.58523 10.5251 8.58041C10.5254 8.57555 10.5257 8.57068 10.5257 8.56569V8.54757C10.5257 8.5131 10.5238 8.47862 10.5214 8.44428C10.5214 8.439 10.5209 8.43394 10.5204 8.42884V8.42883L10.5198 8.42208L10.5182 8.40498C10.5173 8.39023 10.5163 8.37576 10.515 8.36145C10.5112 8.3277 10.5061 8.29409 10.5005 8.26064L10.4986 8.25027L10.4935 8.2228L10.4905 8.20576L10.4905 8.20565C10.4888 8.19563 10.4871 8.18575 10.485 8.17605C10.4785 8.14581 10.4709 8.116 10.4628 8.08649L10.4585 8.07173L10.4533 8.0523L10.447 8.03004C10.4436 8.01818 10.4403 8.00631 10.4365 7.99445C10.4298 7.97354 10.4223 7.95283 10.4147 7.93181L10.4104 7.91994C10.4073 7.91167 10.404 7.9034 10.4007 7.89519L10.4006 7.89505L10.3977 7.88765L10.3889 7.86509C10.3831 7.85003 10.3774 7.83498 10.3709 7.82028C10.3628 7.80178 10.3554 7.78616 10.3476 7.76984L10.343 7.76037C10.3376 7.74911 10.3319 7.73804 10.3262 7.72702L10.3261 7.72688L10.3198 7.7147L10.3143 7.70373C10.3064 7.68805 10.2985 7.67235 10.2897 7.65667C10.2873 7.65222 10.2851 7.64773 10.2828 7.64324C10.2806 7.63875 10.2784 7.63425 10.276 7.6298C10.2734 7.62496 10.2701 7.62041 10.2669 7.61586C10.2642 7.61204 10.2615 7.60823 10.2592 7.60426C10.2507 7.58965 10.2418 7.57616 10.2327 7.56251L10.224 7.54916C10.2148 7.53465 10.2056 7.5203 10.1961 7.50638C10.1836 7.48819 10.1709 7.46964 10.1573 7.45146C10.1475 7.4382 10.1362 7.42422 10.125 7.41042L10.125 7.41041L10.1126 7.39517C10.1112 7.39349 10.1098 7.39175 10.1085 7.38998C10.1069 7.38791 10.1053 7.3858 10.1037 7.38369C10.0996 7.37812 10.0955 7.37259 10.091 7.36792L10.091 7.36788C10.074 7.34758 10.0571 7.32729 10.0396 7.30758C10.0324 7.29981 10.025 7.29229 10.0176 7.28479L10.0175 7.28474C10.0109 7.27808 10.0043 7.27143 9.99795 7.26462L9.98393 7.24992L9.97385 7.23949L9.96938 7.2351C9.94882 7.2149 9.92832 7.19476 9.90693 7.17545C9.8951 7.16463 9.88253 7.1544 9.87012 7.14435C9.86538 7.14008 9.86051 7.1359 9.85559 7.13169C9.85338 7.1298 9.85115 7.12789 9.84893 7.12597L9.84133 7.11936C9.81504 7.09809 9.78859 7.07701 9.76127 7.0567C9.75492 7.05213 9.74836 7.04763 9.7418 7.04312L9.72489 7.03138L9.71087 7.0219L9.69275 7.00953C9.66412 6.99018 9.63475 6.97081 9.60553 6.95438L9.60015 6.95083C9.59682 6.94862 9.59346 6.94638 9.59005 6.94437C9.58772 6.94304 9.58528 6.94179 9.5828 6.94058C9.58104 6.93972 9.57927 6.93889 9.57751 6.93806C9.57232 6.93561 9.5672 6.9332 9.56287 6.93043L9.52883 6.91107C9.50253 6.89734 9.47638 6.8838 9.44935 6.87141L9.44929 6.87138C9.43236 6.86347 9.41544 6.85556 9.39851 6.84841L9.38508 6.84283C9.37382 6.83816 9.36369 6.83397 9.35278 6.82905L9.34137 6.82449L9.34134 6.82448C9.3242 6.81761 9.30688 6.81067 9.28908 6.80451H9.28748V0.0171204H8.01942V1.92918L6.72086 0.631024L5.82421 1.52767L8.01942 3.72268V6.80451H8.01689C7.99581 6.81243 7.97493 6.82074 7.95385 6.82905L7.95362 6.82915C7.93862 6.83512 7.9236 6.8411 7.90859 6.84841C7.8991 6.85304 7.88806 6.85798 7.8769 6.86299L7.85734 6.87183C7.83046 6.88422 7.80414 6.89772 7.77785 6.91145L7.77525 6.91286C7.76473 6.91857 7.75435 6.9242 7.74398 6.93081C7.73739 6.93502 7.7322 6.93736 7.72723 6.93959C7.72375 6.94116 7.72038 6.94267 7.71672 6.94475C7.71443 6.94609 7.71227 6.94756 7.71014 6.94901L7.71013 6.94902C7.70703 6.95113 7.70398 6.9532 7.70066 6.9548C7.67106 6.9726 7.64265 6.99096 7.61382 7.00991L7.59604 7.0219L7.58928 7.0269L7.5754 7.03627C7.56555 7.04289 7.55575 7.04948 7.54614 7.05632C7.51867 7.07682 7.4918 7.09812 7.46511 7.12017L7.45794 7.12635L7.451 7.13197L7.44479 7.13716L4.77572 5.59644L3.97229 2.59857L2.74721 2.92741L3.22263 4.70134L1.56626 3.74472L0.932047 4.84291L2.58823 5.79934L0.814453 6.27436L1.14326 7.49961L4.14113 6.69599L6.8102 8.23668L6.80188 8.28299C6.79801 8.30987 6.79436 8.3369 6.79145 8.36422C6.7904 8.37257 6.78976 8.38091 6.78912 8.38929L6.78912 8.38931L6.78777 8.40557L6.78651 8.41958C6.78492 8.43713 6.78332 8.45471 6.78255 8.47248C6.7812 8.49834 6.78061 8.52464 6.78061 8.54977C6.78061 8.55303 6.78036 8.55615 6.78012 8.55921L6.78012 8.55922C6.77988 8.56218 6.77965 8.56509 6.77965 8.56803C6.77965 8.57098 6.77988 8.5739 6.78012 8.57685L6.78012 8.57687C6.78029 8.57898 6.78046 8.58112 6.78055 8.58329C6.78059 8.58423 6.78061 8.58518 6.78061 8.58614C6.78061 8.61215 6.78061 8.63801 6.78255 8.66358L6.7841 8.68436C6.7853 8.70071 6.78638 8.71537 6.78777 8.73151L6.78914 8.74791C6.78977 8.7562 6.7904 8.7645 6.79145 8.77286C6.79436 8.7993 6.79763 8.82604 6.80188 8.85277C6.80331 8.8624 6.80511 8.87208 6.80691 8.88178L6.8102 8.89996L4.14113 10.4409L1.14326 9.63717L0.814453 10.8621L2.58823 11.3375L0.932047 12.2932L1.56626 13.392L3.22263 12.4355L2.74721 14.2092L3.97229 14.538L4.77572 11.5402L7.44479 9.9995L7.45174 10.005L7.4564 10.0091L7.46626 10.0173C7.49258 10.0388 7.51867 10.0598 7.54632 10.0797C7.55355 10.0852 7.56093 10.0901 7.56835 10.0951L7.56837 10.0951C7.57545 10.0999 7.58257 10.1047 7.58964 10.1099L7.59449 10.1132L7.60478 10.1202L7.6152 10.1273C7.64304 10.1466 7.67168 10.1643 7.70088 10.1812C7.70321 10.1826 7.7054 10.1841 7.70757 10.1856C7.71063 10.1877 7.71364 10.1898 7.71692 10.1915C7.72368 10.1956 7.73065 10.1992 7.73766 10.2028L7.75038 10.2094C7.75978 10.2147 7.76565 10.2177 7.77232 10.2211L7.77631 10.2232L7.78712 10.2293L7.80312 10.2377C7.81477 10.2438 7.82644 10.2499 7.83838 10.2556C7.8612 10.2668 7.88415 10.2769 7.90714 10.287L7.91885 10.2921L7.92697 10.2958C7.94378 10.3031 7.96042 10.3091 7.97745 10.3151L8.00471 10.3254L8.01942 10.331V13.4119L5.82421 15.6072L6.72086 16.5039L8.01942 15.2053V17.1178H9.28748V15.2053L10.5857 16.5039L11.4826 15.6072L9.28762 13.4119V10.331L9.30209 10.3254L9.32985 10.3151L9.35322 10.3061C9.36208 10.3027 9.37097 10.2994 9.37981 10.2958L9.38872 10.2917C9.41531 10.2802 9.4419 10.2685 9.4682 10.2558C9.48588 10.247 9.50312 10.2379 9.52007 10.2289L9.53015 10.2235C9.53906 10.2186 9.54797 10.2141 9.55688 10.2091C9.56194 10.2062 9.5684 10.2029 9.5751 10.1994L9.57511 10.1994L9.59034 10.1913C9.591 10.1909 9.59165 10.1906 9.59231 10.1901C9.59429 10.1889 9.59625 10.1875 9.59825 10.1861L9.59826 10.1861C9.60072 10.1844 9.60322 10.1826 9.60582 10.1811C9.63504 10.164 9.66383 10.146 9.69158 10.1273L9.71248 10.1124L9.71759 10.1091L9.72169 10.1063C9.73466 10.0976 9.74772 10.0888 9.76054 10.0794C9.78714 10.0604 9.81318 10.0393 9.83893 10.0184L9.83898 10.0183L9.8406 10.017L9.85083 10.0081L9.85551 10.004L9.86208 9.99891L12.5311 11.5395L13.3347 14.5374L14.5596 14.2087L14.0842 12.4349L15.7403 13.3916L16.3745 12.2928L10.4964 8.89938C10.4981 8.88508 10.5 8.87149 10.5019 8.85816L10.5019 8.85807L10.5059 8.82852ZM13.7718 8.84401C14.0325 8.3784 14.1669 7.85263 14.1616 7.319C14.1565 6.78534 14.0117 6.26233 13.742 5.80189C13.4722 5.34143 13.0866 4.95953 12.6236 4.69411C12.1607 4.42868 11.6363 4.28895 11.1026 4.28878V5.55681C11.415 5.55705 11.7219 5.6389 11.9928 5.79427C12.2638 5.94965 12.4894 6.17316 12.6475 6.4426C12.8054 6.71205 12.8903 7.01805 12.8935 7.33038C12.8967 7.6427 12.8184 7.95047 12.666 8.22309L13.7718 8.84401Z"
                fill="current"
              ></path>
            </svg>
            {parseWalletAddress(addressForFire)}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </h3>
      )}
      {(addressforAvvy || addressForFire) && (
        <h3 class="flex flex-row items-center justify-center">
          <a
            href={`https://www.nftinsights.pro/accounts/${
              addressforAvvy || addressForFire
            }/overview`}
            target="_blank"
            class="hover:text-white flex flex-row items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              class=" w-10 h-10 inline mt-[-2px]"
            >
              <path
                fill-rule="evenodd"
                d="M3 6a3 3 0 013-3h12a3 3 0 013 3v12a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm4.5 7.5a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zm3.75-1.5a.75.75 0 00-1.5 0v4.5a.75.75 0 001.5 0V12zm2.25-3a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0V9.75A.75.75 0 0113.5 9zm3.75-1.5a.75.75 0 00-1.5 0v9a.75.75 0 001.5 0v-9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            NFT Insights
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 28"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </h3>
      )}
    </div>
  );
}

export function InvalidSearch({ error }) {
  console.log(error);
  return (
    <>
      <div class="">
        {error && <h3>{error}</h3>}
        {!error && <h3 class="invisible">{error}</h3>}
      </div>
    </>
  );
}

export default function WhoIs() {
  const [inputText, setInputText] = useState(null);
  const [error, setError] = useState();

  // reverse lookup
  const [reverseLookup, setReverseLookup] = useState(false);
  const [avvyDomain, setAvvyDomain] = useState();
  const [dotFireDomain, setDotFireDomain] = useState();
  const [validAvvy, setValidAvvy] = useState(false);
  const [validFire, setValidFire] = useState(false);
  const [validSearch, setValidSearch] = useState();

  // forward lookup
  const [forwardLookup, setForwardLookup] = useState(false);
  const [addressforAvvy, setAddressForAvvy] = useState();
  const [addressForFire, setAddressForFire] = useState();

  const handleUserInput = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  const performForwardLookup = async (domain) => {
    setAvvyDomain(null);
    setDotFireDomain(null);
    setValidAvvy(false);
    setValidFire(false);
    if (domain.endsWith(".avax")) {
      // .avax
      const { address, error } = await forwardLookupAvvy(domain);
      console.log(address, error);
      if (error) {
        setValidSearch(false);
        setError(error);
      } else {
        setValidSearch(true);
        setForwardLookup(true);
        setAddressForAvvy(address);
        setAddressForFire(null);
        setError(null);
      }
    } else if (domain.endsWith(".fire") || domain.endsWith(".moo")) {
      // .fire/moo
      const { address, error } = await forwardLookupfire(domain);
      console.log(address, error);
      if (error) {
        setValidSearch(false);
        setError(error);
      } else if (address === "0x0000000000000000000000000000000000000000") {
        setValidSearch(false);
        setError("No domain registered for " + domain);
      } else {
        console.log("forward", address);
        setValidSearch(true);
        setForwardLookup(true);
        setReverseLookup(false);
        setAddressForFire(address);
        setAddressForAvvy(null);
        setError(null);
      }
    } else {
      // invalid domain
      setValidSearch(false);
      setError("Invalid domain");
      // reset everything
      setForwardLookup(false);
      setAddressForAvvy(null);
      setAddressForFire(null);
    }
  };

  const performReverseLookup = async (address) => {
    const { avvy, avvyError } = await lookupAvvy(address);
    const { fireDomain, fireError } = await lookupFire(address);
    console.log("avvy", avvy, avvyError);
    console.log("fire", fireDomain, fireError);

    if (avvyError) {
      setValidSearch(false);
      setReverseLookup(false);
      setForwardLookup(false);
    } else {
      setValidSearch(true);
      setReverseLookup(true);
      setForwardLookup(false);
      console.log(avvy !== undefined);
      if (avvy) {
        console.log("setting avvy");
        setAvvyDomain(avvy);
        setValidAvvy(true);
      } else {
        setAvvyDomain(null);
        setValidAvvy(false);
      }
    }

    if (fireError) {
      setValidSearch(false);
      setReverseLookup(false);
      setForwardLookup(false);
    } else {
      setValidSearch(true);
      setReverseLookup(true);
      setForwardLookup(false);
      if (fireDomain) {
        console.log("setting fire");
        setDotFireDomain(fireDomain);
        setValidFire(true);
      } else {
        console.log("fire to null");
        setDotFireDomain(null);
        setValidFire(false);
      }
    }

    // if(!avvy && !fireDomain){
    //     // invalid domain
    //   setValidSearch(false);
    //   setError("No avvy or .fire regi");
    //   // reset everything
    //   setForwardLookup(false);
    //   setAddressForAvvy(null);
    //   setAddressForFire(null);
    // }
  };

  const submitLookup = async (e) => {
    console.log("Lookup for: " + inputText);
    if (inputText.startsWith("0x")) {
      // reverse lookup for address
      // check if address is valid otherwise display error
      const validAddress = ethers.utils.isAddress(inputText);
      if (validAddress) {
        performReverseLookup(inputText);
      } else {
        setValidSearch(false);
        setError("Invalid Address");
      }
    } else {
      // forward lookup
      performForwardLookup(inputText);
    }
  };

  const submitFromForm = async (e) => {
    await submitLookup(e);
  };

  const submitFromKey = async (e) => {
    if (e.key === "Enter") {
      submitLookup(e);
    }
  };
  return (
    <>
      <div class="h-[93vh] md:h-[100vh] bg-black">
        <div class="text-white flex justify-center flex-col w-full h-full">
          <div class="m-auto flex flex-col justify-center text-center">
            <h1 class="text-3xl md:text-7xl m-auto p-2 font-bold">(who, is)</h1>
            <div
              class="relative w-72 m-auto"
              onKeyUp={(event) => submitFromKey(event)}
            >
              <input
                type="text"
                class="w-full h-10 pl-6 bg-black outline-2 border-b-2 border-gray-400 focus:outline-none"
                // class="w-[250px] xl:w-[60px] 2xl:w-[100px] p-2 xl:px-6 xl:py-1 pl-6 h-full bg-stone-100 dark:bg-gray-800 text-stone-600 placeholder:text-stone-600 dark:text-gray-300 placeholder:dark:text-gray-300 outline-0 rounded-md border border-stone-200 dark:border-gray-900 focus:bg-white focus:border-cyan-500"
                placeholder="address or .avax/.fire/.moo"
                value={inputText}
                onChange={(event) => handleUserInput(event)}
              />

              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
                class="hover:text-white hover:cursor-pointer w-3 h-3 absolute top-1/2 left-2 -translate-y-1/2 z-20 text-stone-400 dark:text-gray-700"
                onClick={(e) => submitFromForm(e)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <div class="text-gray-400 py-4">
              {validSearch ? (
                <ValidSearch
                  forwardLookup={forwardLookup}
                  reverseLookup={reverseLookup}
                  addressforAvvy={addressforAvvy}
                  addressForFire={addressForFire}
                  avvyDomain={avvyDomain}
                  validAvvy={validAvvy}
                  dotFireDomain={dotFireDomain}
                  validFire={validFire}
                  address={inputText}
                />
              ) : (
                <InvalidSearch error={error} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
