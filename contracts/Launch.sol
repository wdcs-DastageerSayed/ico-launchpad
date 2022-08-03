// SPDX-License-Identifier: agpl-3.0
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IWETHGateway {
    function depositETH(
        address lendingPool,
        address onBehalfOf,
        uint16 referralCode
    ) external payable;

    function withdrawETH(
        address lendingPool,
        uint256 amount,
        address onBehalfOf
    ) external;

    function repayETH(
        address lendingPool,
        uint256 amount,
        uint256 rateMode,
        address onBehalfOf
    ) external payable;

    function borrowETH(
        address lendingPool,
        uint256 amount,
        uint256 interesRateMode,
        uint16 referralCode
    ) external;

    function getWETHAddress() external view returns (address);
}

interface IPoolAddressesProvider {
    function getLendingPool() external view returns (address);
}

interface IERC201 {
    event Transfer(address indexed from, address indexed to, uint256 value);
    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `to`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address to, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `from` to `to` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 amount
    ) external returns (bool);

    function name() external view returns (string memory);

    function symbol() external view returns (string memory);
}

contract ICOLaunchpad is ReentrancyGuard {
    using SafeMath for uint256;
    address private manager;
    address poolAddress;
    IWETHGateway ethContract;
    event lProject(
        address _projectAdd,
        uint256 noTokens,
        uint256 _rate,
        uint256 _Tokens,
        uint256 sD,
        uint256 eD
    );
    event cal(uint256);
    event buyT(address buyer, uint256 numberofTokens);
    event refundevent(address paddress, address baddress, uint256 amount);
    event fundtransferevent(
        address paddress,
        address tokenOwneraddress,
        uint256 amount,
        uint256 remainingToken
    );
    struct Project {
        address projectAdd;
        address payable owner;
        uint256 startDate;
        uint256 endDate;
        uint256 listDate;
        uint256 targetAmount;
        uint256 noTokens;
        uint256 rate;
        uint256 Tokens;
        uint256 amountGenerated;
        string name;
        string symbol;
    }
    struct buyerData {
        uint256 amount;
        uint256 tokens;
        uint256 date;
    }
    mapping(address => Project) public projects;
    // mapping(address => buyerData) public buyers;
    Project[] public parr;
    mapping(address => mapping(address => buyerData)) public buyers;

    constructor() {
        manager = msg.sender;
    }

    modifier onlyManger() {
        require(manager == msg.sender, "Only authorize manager access it");
        _;
    }
    modifier lock1(address _projectAdd) {
        Project storage p = projects[_projectAdd];
        uint256 timePeriod = 60 + p.endDate;
        require(block.timestamp > timePeriod);
        _;
    }

    function listProject(
        address _projectAdd,
        uint256 _noTokens,
        uint256 _rate,
        uint256 _Tokens,
        uint256 sD,
        uint256 eD
    ) external {
        Project storage newP = projects[_projectAdd];
        newP.projectAdd = _projectAdd;
        newP.owner = payable(msg.sender);
        newP.listDate = block.timestamp;
        newP.noTokens = _noTokens;
        newP.startDate = sD;
        newP.endDate = eD;
        newP.rate = _rate;
        newP.Tokens = _Tokens;
        newP.name = IERC201(_projectAdd).name();
        newP.symbol = IERC201(_projectAdd).symbol();
        parr.push(newP);
        IERC201(_projectAdd).transferFrom(msg.sender, address(this), _noTokens);
        emit lProject(_projectAdd, _noTokens, _rate, _Tokens, sD, eD);
    }

    function caculate(uint256 amountTokens, address _projectAdd) external {
        Project storage p = projects[_projectAdd];
        uint256 amount = amountTokens;
        // p.amountGenerated += msg.value;
        // contributors[_projectAdd][msg.sender].amount = amountTokens;
        uint256 eth = amount.mul(p.rate);
        eth = eth.div(p.Tokens);
        emit cal(eth);
    }

    function BuyToken(address _projectAdd) public payable {
        Project storage p = projects[_projectAdd];
        require(block.timestamp > p.startDate);
        require(block.timestamp < p.endDate);
        uint256 amount = msg.value;
        p.amountGenerated += msg.value;
        buyers[_projectAdd][msg.sender].amount = msg.value;
        uint256 noTokens = amount.mul(p.Tokens);
        noTokens = noTokens.div(p.rate);
        buyers[_projectAdd][msg.sender].tokens = noTokens;
        buyers[_projectAdd][msg.sender].date = block.timestamp;
        // emit Fproject(msg.sender,noTokens);
        IERC201(_projectAdd).transfer(msg.sender, noTokens);
        emit buyT(msg.sender, noTokens);
    }

    function refund(address _projectAdd, address buyeradd) external {
        Project storage p = projects[_projectAdd];
        require(block.timestamp > p.startDate);
        require(block.timestamp < p.endDate);
        buyerData storage b = buyers[_projectAdd][msg.sender];
        require(b.amount > 0);
        address payable buyer = payable(msg.sender);
        IERC201(_projectAdd).transferFrom(msg.sender, address(this), b.tokens);
        buyer.transfer(b.amount);
        b.amount = 0;
        emit refundevent(_projectAdd, buyeradd, b.amount);
    }

    receive() external payable {}

    function fundTransfer(address _projectAdd) public lock1(_projectAdd) {
        Project storage p = projects[_projectAdd];
        require(p.owner == msg.sender);
        p.owner.transfer(p.amountGenerated);
        p.amountGenerated = 0;
        IERC201(_projectAdd).transfer(
            msg.sender,
            IERC201(_projectAdd).balanceOf(address(this))
        );
        uint256 remainingT = IERC201(_projectAdd).balanceOf(address(this));
        emit fundtransferevent(
            _projectAdd,
            msg.sender,
            p.amountGenerated,
            remainingT
        );
    }

    function depositETH() public payable onlyManger {
        poolAddress = IPoolAddressesProvider(
            0x88757f2f99175387aB4C6a4b3067c77A695b0349
        ).getLendingPool();
        ethContract = IWETHGateway(0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70);
        ethContract.depositETH{value: address(this).balance}(
            poolAddress,
            address(this),
            0
        );
    }

    function withdrawETH(uint256 _amount) public onlyManger {
        IERC201(0x87b1f4cf9BD63f7BBD3eE1aD04E8F52540349347).approve(
            0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70,
            _amount
        );
        ethContract.withdrawETH(poolAddress, _amount, address(this));
        uint256 profit = address(this).balance.sub(_amount);
        payable(manager).transfer(profit);
    }

    function cbalance(address add) external view returns (uint256) {
        return add.balance;
    }
}
